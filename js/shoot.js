AFRAME.registerComponent("bullets", {
    init: function () {
        this.shootBullet();
    },
    shootBullet:function () {
        window.addEventListener("keydown", (e) => {
            if (e.keyCode ===16) {
                var bullet = document.createElement("a-entity");
                    
                
                bullet.setAttribute("geometry", {
                    primitive: "sphere",
                    radius: 0.1,
                });

                bullet.setAttribute("material", "color", "black");

                var cam = document.querySelector("#camera");

                pos = cam.getAttribute("position");

                bullet.setAttribute("position", {
                    x: pos.x,
                    y: pos.y,
                    z: pos.z,
                });

                var camera = document.querySelector("#camera").object3D;

                //get the camera direction as Three.js Vector
                var direction = new THREE.Vector3();
                camera.getWorldDirection(direction);

                //set the velocity and it direction
                bullet.setAttribute("velocity", direction.multiplyScalar(-10));

                var scene = document.querySelector("#scene");
                
                //set the bullet as the dynamic entity
                bullet.setAttribute("dynamic-body", {
                    shape: "sphere",
                    mass: "0",
                });

                //ad tthe collide event listener to the bullet
                bullet.addEventListener("collide", this.removeBullet);

                scene.appendChild(bullet);

                this.shootSound();
            }
        });
    },
    removeBullet: function (e) {
        
        //bullet element
        var element = e.detail.target.el;

        //element which is hit
        var elementHit =  e.detail.body.el;

        if (elementHit.id.includes("box")) {
            elementHit.setAttribute("material", {
                opacity: 1,
                transparent: true,
            });

            //impulse and point vector
            var impulse = new cancelAnimationFrame.vec3(-2, 2, 1);
            var worldPoint = new cancelAnimationFrame.Vec3().copy(
                elementHit.getAttribute("position")
            );

            elementHit.body.applyImpulse(impulse, worldPoint);

            //remove event listener
            element.removeEventListener("collide", this.shoot);

            //remove the bullets from the scene
            var scene=document.querySelector("#scene");
            scene.removeChild(element);
        }
    },
    shootSound: function () {
        var entity = document.querySelector("#sound1");
        entity.components.sound.playSound();
    },
});