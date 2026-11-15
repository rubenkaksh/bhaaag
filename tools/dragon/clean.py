# Blender: /opt/homebrew/bin/blender -b --python tools/dragon/clean.py -- <out.json> <target tris>
# Cleans TripoSR draft mesh (rotate, drop specks, decimate, centre, 9 m long, three axes).
import bpy,bmesh,sys,json,struct,math
from mathutils import Matrix
out=sys.argv[sys.argv.index('--')+1]; target=int(sys.argv[sys.argv.index('--')+2])
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath="/Users/rubenk/ai-3d/out-dragon/0/mesh.glb")
o=[x for x in bpy.context.scene.objects if x.type=='MESH'][0]
bpy.context.view_layer.objects.active=o; o.select_set(True)
m=o.data
# rotate: new(x,y,z)=(old y, old z, old x)  => dorsal +z, head +y
R=Matrix(((0,1,0,0),(0,0,1,0),(1,0,0,0),(0,0,0,1)))
m.transform(R); m.update()
bm=bmesh.new(); bm.from_mesh(m)
bmesh.ops.remove_doubles(bm,verts=bm.verts,dist=1e-5)
# drop small loose islands
seen=set(); islands=[]
for f in bm.faces:
    if f in seen: continue
    st=[f]; isl=[]; seen.add(f)
    while st:
        c=st.pop(); isl.append(c)
        for e in c.edges:
            for n in e.link_faces:
                if n not in seen: seen.add(n); st.append(n)
    islands.append(isl)
islands.sort(key=len,reverse=True)
drop=[f for i in islands[1:] if len(i)<len(islands[0])*0.02 for f in i]
print("islands",[len(i) for i in islands[:6]],"dropped",len(drop))
bmesh.ops.delete(bm,geom=drop,context='FACES')
bmesh.ops.recalc_face_normals(bm,faces=bm.faces)
bm.to_mesh(m); bm.free()
# decimate
tris=len(m.polygons)
mod=o.modifiers.new('d','DECIMATE'); mod.ratio=target/tris
bpy.ops.object.modifier_apply(modifier='d')
bm=bmesh.new(); bm.from_mesh(m)
bmesh.ops.triangulate(bm,faces=bm.faces)
bmesh.ops.recalc_face_normals(bm,faces=bm.faces)
bm.to_mesh(m); bm.free()
# scale: length (y) to 9 m, centre on bbox centre
ys=[v.co.y for v in m.vertices]; L=max(ys)-min(ys); s=9.0/L
m.transform(Matrix.Scale(s,4))
cs=[sum(v.co[i] for v in m.vertices)/len(m.vertices) for i in range(3)]
bb=[(min(v.co[i] for v in m.vertices)+max(v.co[i] for v in m.vertices))/2 for i in range(3)]
m.transform(Matrix.Translation((-bb[0],-bb[1],-bb[2])))
m.update()
# export blender->three axes: three=(x, z, -y)
col=m.attributes['Color']
# vertex colour per vertex: average of corner colours
acc=[[0,0,0,0] for _ in m.vertices]
for li,l in enumerate(m.loops):
    c=col.data[li].color; a=acc[l.vertex_index]
    for k in range(3): a[k]+=c[k]
    a[3]+=1
def lin2srgb(c): return 12.92*c if c<=0.0031308 else 1.055*(c**(1/2.4))-0.055
pos=[];rgb=[]
for v,a in zip(m.vertices,acc):
    n=max(a[3],1)
    pos+= [v.co.x, v.co.z, -v.co.y]
    rgb+= [max(0,min(255,round(255*a[k]/n))) for k in range(3)]
idx=[]
for p in m.polygons:
    idx+=list(p.vertices)
# flip winding is unneeded: det of (x,z,-y) mapping is +1
mn=[min(pos[i::3]) for i in range(3)];mx=[max(pos[i::3]) for i in range(3)]
print("tris",len(idx)//3,"verts",len(pos)//3,"min",mn,"max",mx)
json.dump({'pos':pos,'rgb':rgb,'idx':idx,'min':mn,'max':mx},open(out,'w'))
