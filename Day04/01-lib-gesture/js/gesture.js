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
        el.addEventListener('mousedown', e => {
            contexts[MOUSE_TYPE] = {}
            onStart(e, contexts[MOUSE_TYPE])
            let move = e => {
                onMove(e, contexts[MOUSE_TYPE])
            }
            let end = e => {
                onEnd(e, contexts[MOUSE_TYPE])
                document.removeEventListener('mousemove', move)
            }
            document.removeEventListener('mousemove', move)
            document.removeEventListener('mouseup', end, { once: true })
        })
    }
    el.addEventListener('touchstart', e => {
        for(let touch of e.changedTouches){
            contexts[touch.identifier] = {}
            onStart(touch, contexts[touch.identifier])
        }
    })
    el.addEventListener('touchmove', e => {
        for(let touch of e.changedTouches){
            onMove(touch, contexts[touch.identifier])
        }
    })
    el.addEventListener('touchend', e =>  {
        for(let touch of e.changedTouches){
            onEnd(touch, contexts[touch.identifier])
            delete contexts[touch.identifier]
        }
    })
    let onStart = (e, context) =>{
        el.dispatchEvent(Object.assign(new CustomEvent('start'), {
            clientX: e.clientX,
            clientY: e.clientY
        }))
        context.isTapping = true
        context.startX = e.clientX
        context.startY = e.clientY
        clearTimeout(context.timeout)
        context.timeout = setTimeout(() => {
            context.isTapping = false
            context.isPaning = true
            el.dispatchEvent(Object.assign(new CustomEvent('pressstart'), {
                clientX: e.clientX,
                clientY: e.clientY
            }))
        }, 500)
    }
    let onMove = (e, context) =>{
        let dx = e.clientX - context.startX
        let dy = e.clientY - context.startY
        el.dispatchEvent((Object.assign(new CustomEvent('move'), {
            clientX: e.clientX,
            clientY: e.clientY
        })))
        if(dx ** 2 + dy ** 2 > 100 && !context.isPaning){
            context.isPaning = true
            if(context.isPressing){
                el.dispatchEvent(Object.assign(new CustomEvent('presscancel'), {
                    clientX: e.clientX,
                    clientY: e.clientY
                }))
            }
            clearTimeout(context.timeout)
            context.isTapping = false
            context.isPressing = false
            el.dispatchEvent(Object.assign(new CustomEvent('panstart'), {
                clientX: e.clientX,
                clientY: e.clientY,
                startX: e.startX,
                startY: e.startY
            }))
            return
        }
        if (context.isPaning){
            el.dispatchEvent(Object.assign(new CustomEvent('pan'), {
                clientX: e.clientX,
                clientY: e.clientY,
                startX: e.startX,
                startY: e.startY
            }))
        }
    }
    let onEnd = (e, context) =>{
        clearTimeout(context.timeout)
        if(context.isPaning){
            el.dispatchEvent(Object.assign(new CustomEvent('penend'), {
                clientX: e.clientX,
                clientY: e.clientY,
                startX: context.startX,
                startY: context.startY
            }))
            context.isPaning = false
        }
        if(context.isTapping){
            el.dispatchEvent((Object.assign(new CustomEvent('tap'), {
                clientX: e.clientX,
                clientY: e.clientY
            })))
            context.isTapping = false
        }
        if(context.isPressing){
            el.dispatchEvent(Object.assign(new CustomEvent('pressend'), {
                clientX: e.clientX,
                clientY: e.clientY
            }))
            context.isPressing = false
        }
        el.dispatchEvent(Object.assign(new CustomEvent('end'), {
            clientX: e.clientX,
            clientY: e.clientY
        }))
    }
}