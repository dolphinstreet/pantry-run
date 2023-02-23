import TinyGesture from "https://unpkg.com/tinygesture@1.1.4/TinyGesture.js";


function initSlider(target) {
    let swiped = false;
    let startOffset = 0;
    const decelerationOnOverflow = 4;
    const revealWidth = 50;
    const snapWidth = revealWidth / 1.5;

    const gesture = new TinyGesture(target);

    // swipe gestures
    gesture.on("panmove", (event) => {
        if (gesture.animationFrame) {
            return;
        }
        // event.preventDefault();
        gesture.animationFrame = window.requestAnimationFrame(() => {
            let getX = (x) => {
                if (x < revealWidth && x > -revealWidth) {
                    return x;
                }
                if (x < -revealWidth) {
                    return (x + revealWidth) / decelerationOnOverflow - revealWidth;
                }
            };
            const newX = getX(startOffset + gesture.touchMoveX);
            target.style.transform = "translateX(" + newX + "px)";
            if (newX >= snapWidth || newX <= -snapWidth) {
                swiped = newX < 0 ? -revealWidth : revealWidth;
            } else {
                swiped = false;
            }
            window.requestAnimationFrame(() => {
                target.style.transition = null;
            });
            gesture.animationFrame = null;
        });
    });

    gesture.on("panend", () => {
        window.cancelAnimationFrame(gesture.animationFrame);
        gesture.animationFrame = null;
        window.requestAnimationFrame(() => {
            target.style.transition = "transform .2s ease-in";
            if (!swiped) {
                startOffset = 0;
                target.style.transform = null;
            } else {
                startOffset = swiped;
                target.style.transform = "translateX(" + swiped + "px)";
            }
        });
    });


}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".swipe-item").forEach(initSlider);
});


export default initSlider;
