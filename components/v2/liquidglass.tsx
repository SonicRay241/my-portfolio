"use client"

import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function LiquidGlass({ width = 2, height = 1, borderRadius = 0.2 }) {
    // Create a rounded rectangle shape
    const shape = React.useMemo(() => {
        const s = new THREE.Shape();
        const w = width, h = height, r = borderRadius;
        s.moveTo(-w / 2 + r, -h / 2);
        s.lineTo(w / 2 - r, -h / 2);
        s.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
        s.lineTo(w / 2, h / 2 - r);
        s.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
        s.lineTo(-w / 2 + r, h / 2);
        s.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
        s.lineTo(-w / 2, -h / 2 + r);
        s.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
        return s;
    }, [width, height, borderRadius]);

    return (
        <mesh>
            <shapeGeometry args={[shape]} />
            <meshPhysicalMaterial
                transmission={1.0}   // Transparency
                opacity={0.8}
                transparent
                roughness={0.3}      // Frosted look
                thickness={0.5}
                clearcoat={1.0}
                metalness={0.1}
            />
        </mesh>
    );
}

export default function AA() {
    return (
        <Canvas camera={{ position: [0, 0, 5] }}>
            <color attach="background" args={["#eceff1"]} />

            {/* A cube behind the glass */}
            <mesh position={[0, 0, -1]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="tomato" />
            </mesh>

            {/* Glass panel */}
            <LiquidGlass width={2} height={1.2} borderRadius={0.25} />

            <ambientLight intensity={0.8} />
            <directionalLight position={[5, 5, 5]} />
            <OrbitControls />
        </Canvas>
    );
}
