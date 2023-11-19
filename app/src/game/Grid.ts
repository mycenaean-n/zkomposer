import { RefObject } from "react";
import * as THREE from 'three';

function numberToColour (colour: number) : string | undefined {
    switch(colour) {
        case 0: 
            return "transparent"
        case 1: 
            return "yellow"
        case 2:
            return "red"
        case 3: 
            return "blue"
    }
}


export class Grid {
    private scene: THREE.Scene
    private camera: THREE.OrthographicCamera
    private renderer: THREE.WebGLRenderer
    private grids: number[][][] = []

    constructor (ref: RefObject<HTMLDivElement>) {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color("white")
        const container = ref.current!;
        const aspect = container.clientWidth / container.clientHeight;
        const d = 20;
        this.camera = new THREE.OrthographicCamera( - d * aspect, d * aspect, d, - d, 1, 1000 );

        this.camera.position.set( 10, 10, 10 ); // all components equal
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( container.clientWidth, container.clientHeight );
        this.renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild( this.renderer.domElement );

        this.camera.position.z = 10;
        this.camera.position.x = 10;
        this.camera.position.y = 10;

        this.camera.lookAt(this.scene.position)
        
    }

    private addCube (color: string, position: THREE.Vector3) {
        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        // immediately use the texture for material creation 

        const material = new THREE.MeshBasicMaterial( { color } );
        const cube = new THREE.Mesh( geometry, material );
        
        cube.position.x = position.x
        cube.position.y = position.y
        cube.position.z = position.z
        this.scene.add( cube );

        const edgesGeometry = new THREE.EdgesGeometry(geometry);
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 5 }); // Black color

        const offset = 0.01;
        const edges = new THREE.LineSegments(edgesGeometry, lineMaterial);
        edges.position.set(offset, offset, offset);
        
        cube.add(edges);
    }

    public initStartingGrid (grid: string) {
        console.log(grid)
        const gridArray = Array.from(grid)
        console.log(gridArray)

        const startingGrid: number[][] = [[],[],[],[],[],[],[], []]

        gridArray.forEach((value, index) => {
            const column = Math.floor(index / 8)
            startingGrid[column].push(Number(value))
        })

        this.grids = [startingGrid]
        
        this.drawGrid()
        
    }

    private drawGrid () {
        this.scene.clear()
        let xOffset = -15, yOffset = 0, zOffset = 0;

        for (let grid of this.grids) {
            for (let column of grid) {
                for (let cube of column) {
                    console.log(numberToColour(cube))
                    this.addCube(numberToColour(cube)!, new THREE.Vector3(xOffset, yOffset, zOffset + 1))
                    yOffset += 1
                }
                yOffset = 0
                zOffset += 1;
            }
            zOffset = 0
            xOffset += 2;
        }
    }

    public transform (fromColour: number, toColour: number) {
        const numberOfGrids = this.grids.length;
        const currentGrid = this.grids[numberOfGrids - 1]

        console.log(currentGrid)
        
        let newGrid = currentGrid;

        for (let column of newGrid) {
            for (let index in column) {
                if (column[index] === fromColour) {
                    column[index] = toColour;
                }
            }
            newGrid.push(column)
        } 
        
        this.grids.push(newGrid)
        this.drawGrid()
    }

    public stack (colour: number) {
        const numberOfGrids = this.grids.length;
        const currentGrid = this.grids[numberOfGrids - 1]
        
        let newGrid = currentGrid;
        
        for (let column of newGrid) {
            for (let index in column) {
                console.log(index)
                if (column[index] === 0) {
                    console.log("transparent")
                    column[index] = colour;
                    break
                }
            }
            newGrid.push(column)
        } 
        

        this.grids.push(newGrid)
        this.drawGrid()
    }

    start () {
        this.renderer.setAnimationLoop(() => {
            this.renderer.render(this.scene, this.camera);
        });
    }
    
}