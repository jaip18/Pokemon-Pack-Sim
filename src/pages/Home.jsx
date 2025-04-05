import React, { useEffect } from "react"
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import Pokeball from '../../public/Pokeball.jsx'
import { AmbientLight } from 'three'
import {Suspense} from 'react'
import '../css/home.css'

function Home(){
    return(
        <div className="main-content">
            <Canvas>
            <ambientLight intensity={6} />
            <OrbitControls enableZoom={true} minDistance={8} maxDistance={20}/>
            <Suspense fallback={null}>
                <Pokeball/>
            </Suspense>
            <Environment preset='sunset'/>
            </Canvas>
        </div>
    )
}

export default Home