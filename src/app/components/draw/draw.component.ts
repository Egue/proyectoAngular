import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styles: [
  ]
})
export class DrawComponent implements OnInit , AfterViewInit {
 

  @ViewChild('canvasRef' , {static:false}) canvasRef:any;

  public width = 800;

  public height = 800;

  private cx: CanvasRenderingContext2D | undefined;

  private points: Array<any> = [];

  @HostListener('document:mousemove' , ['$event'])
  onMouseMove = (e:any) => {
    if(e.target.id=='canvasId'){
      this.write(e)
    }
  }

  constructor() { }

  ngAfterViewInit(): void {
    this.render();
  }
  private render():any{
    const canvasEl=this.canvasRef.nativeElement;

    this.cx = canvasEl.getContext('2d');

    canvasEl.width =  this.width;
    canvasEl.height = this.height;

    //this.cx?.lineWidth = 3;
    //this.cx?.lineCap  = 'round';
    //this.cx?.strokeStyle = '#000';

  }

  private write(res:any):any{
    const canvasEl: any = this.canvasRef.nativeElement;
    const rect = canvasEl.getBoundingClientRect();
    const prevPos = {
      x: res.clientX - rect.left,
      y: res.clientY - rect.top
    };
    this.writeSigle(prevPos);
  }

  private writeSigle = (prevPos: { x: number; y: number; } , emit=true) => {
    this.points.push(prevPos);
    
    if(this.points.length > 3){
      const prevPost = this.points[this.points.length - 1];
      const currentPos = this.points[this.points.length - 2];
      this.drawOnCanvas(prevPos ,  currentPos);
    }
  }
  drawOnCanvas(prevPos: { x: number; y: number; }, currentPos: any) {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
  }

}
