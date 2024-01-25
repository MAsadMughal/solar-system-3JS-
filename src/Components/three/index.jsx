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
        <group position={[0, 0.5, 0]}>
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


    const updatePlanets = (time, ref2, multiple) => {
        ref2.current.position.x = Math.sin(time) * multiple;
        ref2.current.position.z = Math.cos(time) * multiple;
        // mercury.current.rotation.x = time+10;

    };
    // const updateLight = (time) => {
    //     lightref.current.position.x = Math.sin(time) * 4;
    //     lightref.current.position.z = Math.cos(time) * 4;
    //     lightref.current.rotation.x = time;
    // };

    useFrame(({ clock }) => {
        updatePlanets(clock.getElapsedTime() * 3, mercury, 4);
        updatePlanets(clock.getElapsedTime() * 2, venus, 7);
        updatePlanets(clock.getElapsedTime() * 1, earth, 10);
        updatePlanets(clock.getElapsedTime() * 0.5, mars, 13);
        updatePlanets(clock.getElapsedTime() * 0.5, jupiter, 16);
        updatePlanets(clock.getElapsedTime() * 0.1, saturn, 19);
        updatePlanets(clock.getElapsedTime() * 0.05, uranus, 22);
        updatePlanets(clock.getElapsedTime() * 0.01, neptune, 25);
        // updateLight(clock.getElapsedTime() * 1);
    });
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 1, 5]} />

            {/* <OrbitControls ref={orbitControlsref} minPolarAngle={rad(60)} maxPolarAngle={rad(80)} /> */}
            <OrbitControls ref={orbitControlsref} />

            {/* Ball */}
            <mesh position={[0, 0.5, 0]} castShadow>
                <sphereGeometry args={[3, 32, 32]} />
                <meshStandardMaterial color="yellow" />
                <pointLight position={[5, 5, 5]} intensity={1} />
                {/* <pointLight position={[-5, 5, 5]} intensity={1}/>
                <pointLight position={[-5, -5, 5]} intensity={1}/> */}
                <pointLight position={[-5, -5, -5]} intensity={1} />
            </mesh>

            {/* Floor
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
                <planeGeometry args={[70, 70]} />
                <meshStandardMaterial color="#1ea3d8" />
            </mesh> */}


            {/* Mercury */}
            <mesh ref={mercury} position={[7, 0.5, 0]} >
                <sphereGeometry args={[0.383, 32, 32]} />
                <meshStandardMaterial color="#8C8C8C" />
            </mesh>

            {/* Venus */}
            <mesh ref={venus} position={[-5, 0.5, 0]} >
                <sphereGeometry args={[.949, 32, 32]} />
                <meshStandardMaterial color="#E5B454" />
            </mesh>

            {/* Earth */}
            <mesh ref={earth} position={[-12, 0.5, 0]} >
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial color="#4682B4" />
            </mesh>

            {/* Mars */}
            <mesh ref={mars} position={[-19, 0.5, 0]} >
                <sphereGeometry args={[0.532, 32, 32]} />
                <meshStandardMaterial color="#FF6347" />
            </mesh>
            {/* Jupiter */}
            <mesh ref={jupiter} position={[-26, 0.5, 0]} >
                <sphereGeometry args={[1.5, 32, 32]} />
                <meshStandardMaterial color="#D9AB6C" />
            </mesh>
            {/* saturn */}
            <mesh ref={saturn} position={[-33, 0.5, 0]} >
                <sphereGeometry args={[1.4, 32, 32]} />
                <meshStandardMaterial color="#DAA520" />
            </mesh>
            {/* uranus */}
            <mesh ref={uranus} position={[-40, 0.5, 0]} >
                <sphereGeometry args={[1.25, 32, 32]} />
                <meshStandardMaterial color="#98FB98" />
            </mesh>
            {/* naptune */}
            <mesh ref={neptune} position={[-47, 0.5, 0]} >
                <sphereGeometry args={[1.15, 32, 32]} />
                <meshStandardMaterial color="#003366" />
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

