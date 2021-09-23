/*
-start, move, end
-panStart. pan, panEnd
-pressStart, pressEnd
-tap
*/

function enableGesture(el){
    let contexts = {}
    const MOUSE_TYPE = Symbol('mouse')
    if (!('ontouchstart' in document)){
        el.addEventListener('mousedown', () => {
            let move = e => {
                console.log('move')
            }
            let end = e => {
                console.log('end')
            }
            console.log('start')
            document.removeEventListener('mousemove', move)
            document.removeEventListener('mouseup', end, { once: true })
        })
    }
    el.addEventListener('touchstart', e => {
        for(let touch of e.changedTouches){
            onStart(touch)
        }
        console.log('start')
    })
    el.addEventListener('touchmove', e => {
        for(let touch of e.changedTouches){
            onMove(touch)
        }
        console.log('move')
    })
    el.addEventListener('touchend', e =>  {
        for(let touch of e.changedTouches){
            onUp(touch)
        }
        console.log('end')
    })
    let onStart = (e, context) =>{
        el.dispatchEvent(Object.assign(new CustomEvent('start'), {
            clientX: e.clientX,
            clientY: e.clientY
        }))
        context.startX = e.clientX
        context.startY = e.clientY
    }
    let onMove = (e, context) =>{
        let dx = e.clientX - context.startX
        let dy = e.clientY - context.startY
        if(dx ** 2 + dy ** 2 > 100 && !context.isPaning){
            context.isPaning = true
        }
        if (context.isPaning){

        }
        el.dispatchEvent(Object.assign(new CustomEvent('move'), {
            clientX: e.clientX,
            clientY: e.clientY
        }))
    }
    let onUp = e =>{
        el.dispatchEvent(Object.assign(new CustomEvent('end'), {
            clientX: e.clientX,
            clientY: e.clientY
        }))
    }
}