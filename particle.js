class Particle {
    constructor() {
        this.pos = createVector(width/2, height/2);
        this.rays = [];
        this.heading = 0;
        this.fov = 60;
        
        for (let a = -(this.fov/2); a < this.fov/2; a +=0.5){
            this.rays.push(new Ray(this.pos, radians(a)));
        }
        
    }
    
    updateFOV(fov) {
        this.rays = [];
        this.fov = fov;
        
        for (let a = -(this.fov/2); a < this.fov/2; a +=0.5){
            this.rays.push(new Ray(this.pos, radians(a) + this.heading));
        }
    }
    
    rotate(angle) {
        this.heading += angle;
        let index = 0;
        for (let a = -30; a < 30; a +=0.5) {
            this.rays[index].setAngle(radians(a) + this.heading);
            index++;
        }
    }
    
    move(pix) {
        const vel = p5.Vector.fromAngle(this.heading);
        vel.setMag(pix);
        this.pos.add(vel);
    }
    
    update(x, y) {
        
        this.pos.set(x, y);
        
    }
    
    look(walls) {
        const scene = [];
        
        for (let i = 0; i < this.rays.length; i++) {
            
            const ray = this.rays[i];
            let closest = null;
            let record = Infinity;
            
            for (let wall of walls) {
                const pt = ray.cast(wall);

                if (pt) {
                    let d = p5.Vector.dist(this.pos, pt);
                    const a = ray.dir.heading() - this.heading;
                    
                    d *= cos(a);
                    
                    if (d < record) {
                        record = d;
                        closest = pt;
                    }
                }
            }
            
            if (closest) {
                stroke(255, 100);
                line(this.pos.x, this.pos.y, closest.x, closest.y); 
            }
            scene[i] = record;
        }
        
        return scene;
        
    }
    
    show() {
        fill(255, 100);
        ellipse(this.pos.x, this.pos.y, 6, 6);
        
        for (let ray of this.rays) {
            ray.show();
        }
        
    }
    
}