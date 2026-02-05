import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import styles from './CyberBackground.module.css';

const CyberBackground = () => {
    const containerRef = useRef();
    const matrixCanvasRef = useRef();

    useEffect(() => {
        try {
            // --- THREE.JS SETUP ---
            if (!containerRef.current) return;

            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

            // Clear previous children to avoid duplicates
            while (containerRef.current.firstChild) {
                containerRef.current.removeChild(containerRef.current.firstChild);
            }
            containerRef.current.appendChild(renderer.domElement);
            camera.position.z = 5;

            // --- 3D ELEMENTS ---
            // 1. Digital Globe (Wireframe/Points)
            const geometry = new THREE.IcosahedronGeometry(2, 2);
            const material = new THREE.MeshBasicMaterial({
                color: 0x00f3ff,
                wireframe: true,
                transparent: true,
                opacity: 0.15,
            });
            const globe = new THREE.Mesh(geometry, material);
            scene.add(globe);

            // Add points for more techy look
            const pointsGeometry = new THREE.IcosahedronGeometry(2.05, 3);
            const pointsMaterial = new THREE.PointsMaterial({
                color: 0x00f3ff,
                size: 0.02,
            });
            const globePoints = new THREE.Points(pointsGeometry, pointsMaterial);
            scene.add(globePoints);

            // 2. Stars/Particles
            const particlesCount = 1000; // Reduced for better performance
            const posArray = new Float32Array(particlesCount * 3);
            for (let i = 0; i < particlesCount * 3; i++) {
                posArray[i] = (Math.random() - 0.5) * 20;
            }
            const particlesGeometry = new THREE.BufferGeometry();
            particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
            const particlesMaterial = new THREE.PointsMaterial({
                size: 0.005,
                color: 0x00f3ff,
                transparent: true,
                opacity: 0.8,
            });
            const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
            scene.add(particlesMesh);

            // 3. Floating 'Clues'
            const clueCount = 10;
            const cluesGeometry = new THREE.BufferGeometry();
            const cluesPos = new Float32Array(clueCount * 3);
            for (let i = 0; i < clueCount * 3; i++) {
                cluesPos[i] = (Math.random() - 0.5) * 10;
            }
            cluesGeometry.setAttribute('position', new THREE.BufferAttribute(cluesPos, 3));
            const cluesMaterial = new THREE.PointsMaterial({
                size: 0.1,
                color: 0xff00ff, // Purple 'bounty' clues
                transparent: true,
                opacity: 0.6,
            });
            const cluesMesh = new THREE.Points(cluesGeometry, cluesMaterial);
            scene.add(cluesMesh);

            // 4. Perspective Grid
            const gridHelper = new THREE.GridHelper(20, 40, 0x00f3ff, 0x011111);
            gridHelper.position.y = -3;
            gridHelper.rotation.x = Math.PI * 0.05;
            scene.add(gridHelper);

            const gridHelperTop = new THREE.GridHelper(20, 40, 0x00f3ff, 0x011111);
            gridHelperTop.position.y = 3;
            gridHelperTop.rotation.x = -Math.PI * 0.05;
            scene.add(gridHelperTop);

            // --- ANIMATION ---
            let mouseX = 0;
            let mouseY = 0;
            const handleMouseMove = (event) => {
                mouseX = (event.clientX / window.innerWidth - 0.5) * 0.3;
                mouseY = (event.clientY / window.innerHeight - 0.5) * 0.3;
            };
            window.addEventListener('mousemove', handleMouseMove);

            let animationFrameId;
            const animate = () => {
                animationFrameId = requestAnimationFrame(animate);
                globe.rotation.y += 0.002;
                globePoints.rotation.y -= 0.001;
                particlesMesh.rotation.y += 0.0005;
                cluesMesh.rotation.y -= 0.001;
                cluesMesh.rotation.z += 0.0005;
                gridHelper.position.z = (gridHelper.position.z + 0.01) % 0.5;
                gridHelperTop.position.z = (gridHelperTop.position.z + 0.01) % 0.5;

                // Smooth movement based on mouse
                camera.position.x += (mouseX - camera.position.x) * 0.05;
                camera.position.y += (-mouseY - camera.position.y) * 0.05;
                camera.lookAt(scene.position);

                renderer.render(scene, camera);
            };

            // --- MATRIX RAIN SETUP ---
            let matrixInterval;
            if (matrixCanvasRef.current) {
                const matrixCanvas = matrixCanvasRef.current;
                const ctx = matrixCanvas.getContext('2d');
                let width = (matrixCanvas.width = window.innerWidth);
                let height = (matrixCanvas.height = window.innerHeight);
                const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%"\\#&_(),.;:?!\\\\|{}<>[]^~';
                const fontSize = 14;
                const columns = Math.floor(width / fontSize);
                const drops = new Array(columns).fill(1);

                const drawMatrix = () => {
                    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
                    ctx.fillRect(0, 0, width, height);
                    ctx.fillStyle = '#00f3ff66'; // Semi-transparent cyan
                    ctx.font = fontSize + 'px monospace';
                    for (let i = 0; i < drops.length; i++) {
                        const text = chars.charAt(Math.floor(Math.random() * chars.length));
                        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                        if (drops[i] * fontSize > height && Math.random() > 0.975) {
                            drops[i] = 0;
                        }
                        drops[i]++;
                    }
                };
                matrixInterval = setInterval(drawMatrix, 50);
            }

            // --- RESIZE HANDLER ---
            const handleResize = () => {
                if (!containerRef.current || !matrixCanvasRef.current) return;
                const matrixCanvas = matrixCanvasRef.current;
                const width = (matrixCanvas.width = window.innerWidth);
                const height = (matrixCanvas.height = window.innerHeight);
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            };
            window.addEventListener('resize', handleResize);

            // Start animation
            animate();

            // --- CLEANUP ---
            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('resize', handleResize);
                cancelAnimationFrame(animationFrameId);
                if (matrixInterval) clearInterval(matrixInterval);
                try {
                    if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
                        containerRef.current.removeChild(renderer.domElement);
                    }
                    renderer.dispose();
                    geometry.dispose();
                    material.dispose();
                } catch (e) {
                    console.warn('Cleanup error:', e);
                }
            };
        } catch (error) {
            console.error('CyberBackground Error:', error);
            // Render a fallback background
            if (containerRef.current) {
                containerRef.current.style.background = 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)';
            }
        }
    }, []);

    return (
        <div className={styles.backgroundContainer}>
            <canvas ref={matrixCanvasRef} className={styles.matrixCanvas} />
            <div ref={containerRef} className={styles.threeCanvas} />
            <div className={styles.overlay} />
        </div>
    );
};

export default CyberBackground;
