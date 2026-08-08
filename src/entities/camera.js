export class Camera {
    /**
   * @param {number} viewportWidth largeur visible (ex: 800)
   * @param {number} viewportHeight hauteur visible (ex: 400)
   * @param {HTMLElement} worldElement le div #world qui contient toutes les entités
   */
    constructor(viewportWidth, viewportHeight, worldElement){
        this.x = 0;
        this.y = 0;
        this.viewportWidth = viewportWidth;
        this.viewportHeight = viewportHeight;
        this.worldElement = worldElement;
        this.level = null;
    }
    /**
     * 
     * @param {import('../level/Level.js').Level} level 
     */
    setLevel(level) {
    this.level = level;
    this.x = 0;
    this.y = 0;
    this.worldElement.style.width = level.width + 'px';
    this.render();
  }
  /**
   * 
   * @param {{x:number, y:number, width:number, height:number}} target 
   */
  follow(target){
    if(!this.level) return

    const targetX=(target.x + target.width/2) - this.viewportWidth/2;
    this.x=Math.max(0,Math.min(targetX,Math.max(0,this.level.width - this.viewportWidth)));
     const levelHeight = this.level.height || this.viewportHeight;
    if (levelHeight > this.viewportHeight) {
      const targetY = (target.y + target.height / 2) - this.viewportHeight / 2;
      this.y = Math.max(0, Math.min(targetY, levelHeight - this.viewportHeight));
    } else {
      this.y = 0;
    }
    
  }
  render() {
    this.worldElement.style.transform = `translate(${-this.x}px, ${-this.y}px)`;
  }
}