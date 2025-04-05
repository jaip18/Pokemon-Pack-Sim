import React, { useState, useRef, useEffect } from "react";
import "../css/card.css";

function Card({ card, style = {}, flipped = false }) {
    const [isFlipped, setFlipped] = useState(flipped);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isFlipping, setIsFlipping] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const cardRef = useRef(null);

    const handleFlip = () => {
        setIsFlipping(true);
        setFlipped((prev) => !prev);
        
        // Hide shine effect during flip animation
        if (cardRef.current) {
            const shineElement = cardRef.current.querySelector('.shine-effect');
            if (shineElement) {
                shineElement.style.opacity = '0';
            }
        }


        setTimeout(() => {
            setIsFlipping(false);
        }, 600);
    };

    const MAX_ROTATION = 90; // Limits rotation

    const handleMouseEnter = () => {
        setIsHovering(true);
    };

    const handleHover = (e) => {
        if (isFlipping) return;

        // Ensure we're hovering
        if (!isHovering) {
            setIsHovering(true);
        }

        const cardXY = e.currentTarget.getBoundingClientRect();

        const centerX = cardXY.left + cardXY.width / 2;
        const centerY = cardXY.top + cardXY.height / 2;

        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const percentX = (mouseX - centerX) / (cardXY.width / 2);
        const percentY = (mouseY - centerY) / (cardXY.height / 2);

        const rotateY = percentX * MAX_ROTATION / 3; // Reduced intensity
        const rotateX = -percentY * MAX_ROTATION / 3;

        setPosition({ x: rotateY, y: rotateX });
        
        // Only update shine effect if not currently flipping
        if (!isFlipping) {
            updateRadialShineEffect(e.currentTarget, mouseX - cardXY.left, mouseY - cardXY.top, cardXY.width, cardXY.height);
        }
    };

    const updateRadialShineEffect = (element, mouseX, mouseY, width, height) => {
        if (!element || isFlipping) return;
        
        // Access the shine element
        const shineElement = element.querySelector('.shine-effect');
        if (!shineElement) return;

        // Convert mouse position to percentage
        const posX = (mouseX / width) * 100;
        const posY = (mouseY / height) * 100;
        
        // Calculate distance from center for intensity
        const centerX = width / 2;
        const centerY = height / 2;
        const distanceFromCenter = Math.sqrt(
            Math.pow((mouseX - centerX) / centerX, 2) + 
            Math.pow((mouseY - centerY) / centerY, 2)
        );
        
        // Maximum intensity at edges, minimum at center
        const intensity = Math.min(0.4, distanceFromCenter * 0.3);
        
        // Create radial gradient with larger radius
        shineElement.style.background = `radial-gradient(
            circle at ${posX}% ${posY}%, 
            rgba(255, 255, 255, ${intensity + 0.15}) 0%, 
            rgba(255, 255, 255, ${intensity}) 30%, 
            rgba(255, 255, 255, ${intensity * 0.5}) 60%,
            rgba(255, 255, 255, 0) 100%
        )`;
        
        // Make shine visible only if not flipping
        shineElement.style.opacity = (!isFlipping) ? '10' : '0';
    };

    const resetXY = () => {
        setIsHovering(false);
        setPosition({ x: 0, y: 0 });
        
        // Maintain position briefly for smooth transition out
        setTimeout(() => {
            if (!isHovering) {
                setPosition({ x: 0, y: 0 });
            }
        }, 50);
        
        // Hide shine effect when mouse leaves
        if (cardRef.current) {
            const shineElement = cardRef.current.querySelector('.shine-effect');
            if (shineElement) {
                shineElement.style.opacity = '0';
                shineElement.style.transition = 'opacity 0.3s ease-out';
            }
        }
    };

    // Calculate Dynamic Box Shadow, disabled during flip
    const shadowX = isFlipping ? 0 : position.x * 0.5;
    const shadowY = isFlipping ? 0 : position.y * 0.5;
    const shadowBlur = isFlipping ? 0 : Math.abs(position.x) + Math.abs(position.y);

    // Create shine effect element on mount
    useEffect(() => {
        if (cardRef.current) {
            let shineElement = cardRef.current.querySelector('.shine-effect');
            
            if (!shineElement) {
                shineElement = document.createElement('div');
                shineElement.className = 'shine-effect';
                shineElement.style.position = 'absolute';
                shineElement.style.top = '0';
                shineElement.style.left = '0';
                shineElement.style.right = '0';
                shineElement.style.bottom = '0';
                shineElement.style.borderRadius = '8px';
                shineElement.style.pointerEvents = 'none';
                shineElement.style.zIndex = '2';
                shineElement.style.opacity = '0';
                shineElement.style.transition = 'opacity 0.15s ease-in, background 0.15s ease';
                shineElement.style.mixBlendMode = 'overlay'; // This enhances the shine effect
                cardRef.current.appendChild(shineElement);
            }
        }
        
        return () => {
            // Clean up shine element on unmount
            if (cardRef.current) {
                const shineElement = cardRef.current.querySelector('.shine-effect');
                if (shineElement) {
                    shineElement.remove();
                }
            }
        };
    }, []);

    // Effect to hide shine during flipping
        useEffect(() => {
            if (isFlipping && cardRef.current) {
                const shineElement = cardRef.current.querySelector('.shine-effect');
                if (shineElement) {
                    shineElement.style.opacity = '0';
                }
            }
        }, [isFlipping]);

    // Calculate the scale based on hover state
    const cardScale = isHovering ? 1.1 : 1.0;

    return (
        <div
            ref={cardRef}
            className="card-item"
            onClick={handleFlip}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleHover}
            onMouseLeave={resetXY}
            style={{
                ...style,
                transform: `${style.transform || ''} rotateY(${position.x}deg) rotateX(${-position.y}deg) scale(${cardScale})`,
                transition: isHovering 
                    ? "transform 0.15s ease-out, box-shadow 0.15s ease-out" 
                    : "transform 0.3s ease-out, box-shadow 0.3s ease-out",
                boxShadow: `${-shadowX}px ${shadowY}px ${shadowBlur}px rgba(0, 0, 0, 0.3)`,
            }}
        >
            <div className={`card-inner ${isFlipped ? "flipped" : ""}`}>
                <div className="card-front">
                    <img 
                        src={card.images.small} 
                        alt={card.name} 
                        style={{ objectFit: "contain", width: "100%", height: "100%", borderRadius: "8px" }}
                    />
                </div>
                <div className="card-back">
                    <img 
                        src="https://images.pokemontcg.io/mcd17/5.png" 
                        style={{ objectFit: "contain", width: "100%", height: "100%", borderRadius: "8px" }}
                    />
                </div>
            </div>
        </div>
    );
}

export default Card;