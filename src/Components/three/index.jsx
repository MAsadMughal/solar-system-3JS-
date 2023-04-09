import React, { useRef } from "react"
import { Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three'
import earth from "../../assets/earth.jpg";


function Star({ position, speed }) {
    const ref = useRef();

    useFrame(({ clock }) => {
        ref.current.position.x += speed * Math.sin(clock.getElapsedTime());
        ref.current.position.y += speed * Math.cos(clock.getElapsedTime());
        ref.current.position.z += speed * Math.sin(clock.getElapsedTime());
    });

    return (
        <mesh ref={ref} position={position}>
            <sphereGeometry args={[0.3, 8, 8]} />
            <meshBasicMaterial color="white" />
        </mesh>
    );
}

function Scene() {
    const numStars = 1000;
    const stars = new Array(numStars).fill().map(() => ({
        position: new THREE.Vector3(
            (Math.random() - 0.5) * 500,
            (Math.random() - 0.5) * 500,
            (Math.random() - 0.5) * 500
        ),
        speed: Math.random() * 0.01 + 0.001
    }));

    return (
        <>
            {stars.map((star, index) => (
                <Star key={index} position={star.position} speed={star.speed} />
            ))}
        </>
    );
}



function CircularOrbit({ radius = 5 }) {

    const orbitCurve = React.useMemo(() => {
        const curve = new THREE.CatmullRomCurve3(
            Array.from({ length: 64 }, (_, i) => {
                const angle = (i / 63) * Math.PI * 2;
                return new THREE.Vector3(
                    radius * Math.cos(angle),
                    0,
                    radius * Math.sin(angle)
                );
            }),
            false,
            'centripetal',
            0.5
        );
        return curve;
    }, [radius]);

    const orbitGeometry = React.useMemo(() => {
        return new THREE.BufferGeometry().setFromPoints(orbitCurve.getPoints(64));
    }, [orbitCurve]);

    const orbitMaterial = React.useMemo(() => {
        return new THREE.LineBasicMaterial({ color: 'white' });
    }, []);

    return (
        <group position={[0,0.5,0]}>
            <line geometry={orbitGeometry} material={orbitMaterial} />
        </group>
    );
}




export default function Three() {
    const rad = (deg) => {
        return Math.PI / 180 * deg;
    }
    const orbitControlsref = useRef(null);
    useFrame(() => {
        if (!!orbitControlsref.current) {
            // const { x, y } = state.mouse;
            // orbitControlsref.current.setAzimuthalAngle(-x * rad(45));
            // orbitControlsref.current.setPolarAngle((y + 1) * rad(90 - 30));
            orbitControlsref.current.update();
        }
    })

    const mercury = useRef();
    const venus = useRef();
    const earth = useRef();
    const mars = useRef();
    const jupiter = useRef();
    const saturn = useRef();
    const uranus = useRef();
    const neptune = useRef();
    const lightref = useRef();


    const updatePlanets = (time) => {
        mercury.current.position.x = Math.sin(time) * 4;
        mercury.current.position.z = Math.cos(time) * 4;
        mercury.current.rotation.x = time;
        venus.current.position.x = Math.sin(time) * 7;
        venus.current.position.z = Math.cos(time) * 7;
        venus.current.rotation.x = time;
        earth.current.position.x = Math.sin(time) * 10;
        earth.current.position.z = Math.cos(time) * 10;
        earth.current.rotation.x = time;
        mars.current.position.x = Math.sin(time) * 13;
        mars.current.position.z = Math.cos(time) * 13;
        mars.current.rotation.x = time;
        jupiter.current.position.x = Math.sin(time) * 16;
        jupiter.current.position.z = Math.cos(time) * 16;
        jupiter.current.rotation.x = time;
        saturn.current.position.x = Math.sin(time) * 19;
        saturn.current.position.z = Math.cos(time) * 19;
        saturn.current.rotation.x = time;
        uranus.current.position.x = Math.sin(time) * 22;
        uranus.current.position.z = Math.cos(time) * 22;
        uranus.current.rotation.x = time;
        neptune.current.position.x = Math.sin(time) * 25;
        neptune.current.position.z = Math.cos(time) * 25;
        neptune.current.rotation.x = time;
    };
    // const updateLight = (time) => {
    //     lightref.current.position.x = Math.sin(time) * 4;
    //     lightref.current.position.z = Math.cos(time) * 4;
    //     lightref.current.rotation.x = time;
    // };

    useFrame(({ clock }) => {
        updatePlanets(clock.getElapsedTime() * 1);
        // updateLight(clock.getElapsedTime() * 1);
    });
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 1, 5]} />

            {/* <OrbitControls ref={orbitControlsref} minPolarAngle={rad(60)} maxPolarAngle={rad(80)} /> */}
            <OrbitControls ref={orbitControlsref} />

            {/* Ball */}
            <mesh position={[0, 0.5, 0]} castShadow>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial color="yellow" />
            </mesh>


            {/* Floor
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
                <planeGeometry args={[70, 70]} />
                <meshStandardMaterial color="#1ea3d8" />
            </mesh> */}


            {/* Mercury */}
            <mesh ref={mercury} position={[7, 0.5, 0]} >
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshStandardMaterial color="white" />
            </mesh>

            {/* Venus */}
            <mesh ref={venus} position={[-5, 0.5, 0]} >
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshStandardMaterial color="#f0f0f0" />
            </mesh>

            {/* Earth */}
            <mesh ref={earth} position={[-12, 0.5, 0]} >
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshStandardMaterial color="white" />
            </mesh>

            {/* Mars */}
            <mesh ref={mars} position={[-19, 0.5, 0]} >
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshStandardMaterial color="white" />
            </mesh>
            {/* Jupiter */}
            <mesh ref={jupiter} position={[-26, 0.5, 0]} >
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshStandardMaterial color="white" />
            </mesh>
            {/* saturn */}
            <mesh ref={saturn} position={[-33, 0.5, 0]} >
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshStandardMaterial color="white" />
            </mesh>
            {/* uranus */}
            <mesh ref={uranus} position={[-40, 0.5, 0]} >
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshStandardMaterial color="white" />
            </mesh>
            {/* naptune */}
            <mesh ref={neptune} position={[-47, 0.5, 0]} >
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshStandardMaterial color="white" />
            </mesh>





            <CircularOrbit radius={4} />
            <CircularOrbit radius={7} />
            <CircularOrbit radius={10} />
            <CircularOrbit radius={13} />
            <CircularOrbit radius={16} />
            <CircularOrbit radius={19} />
            <CircularOrbit radius={22} />
            <CircularOrbit radius={25} />


            {/* lights */}
            <ambientLight args={["#ffffff", 0.3]} />
            <pointLight args={['yellow', 10]} position={[0, 1, 0]} castShadow />





            <Environment background>
                <mesh>
                    <sphereGeometry args={[50, 100, 100]} />
                    <meshBasicMaterial color="black" side={THREE.BackSide} />
                </mesh>
            </Environment>
            <Scene />
        </>)
}

