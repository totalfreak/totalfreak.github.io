width               = 1920
height              = 1080
equilateralAltitude = Math.sqrt(3.0) / 2.0
triangleScale       = 70
patch_width         = width * 1.5
patch_height        = height * 1.5

# Create patch of triangles that spans the view
shape = seen.Shapes.patch(
 patch_width / triangleScale / equilateralAltitude
 patch_height / triangleScale
)
.scale(triangleScale)
.translate(-patch_width/2, -patch_height/2 + 80)
.rotx(-0.3)
seen.Colors.randomSurfaces2(shape)

# Create scene and render context
scene = new seen.Scene
 model    : seen.Models.default().add(shape)
 viewport : seen.Viewports.center(width, height)

context = seen.Context('seen-canvas', scene).render()

# Apply animated 3D simplex noise to patch vertices
t = 0
noiser = new seen.Simplex3D(shape)
context.animate()
 .onBefore((t)->
   for surf in shape.surfaces
     for p in surf.points
       p.z = 4*noiser.noise(p.x/8, p.y/8, t*1e-4)
     # Since we're modifying the point directly, we need to mark the surface dirty
     # to make sure the cache doesn't ignore the change
     surf.dirty = true
 )
 .start()