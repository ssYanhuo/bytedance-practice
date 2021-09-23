<template>
  <div id="container">
    <div id="sidebar">
      <span @mousedown="dragElement('Row')">Row</span>
      <span @mousedown="dragElement('Col')">Col</span>
      <span @mousedown="dragElement('Btn')">Btn</span>
    </div>
    <div data-accept-type="Row" id="edit-panel" data-area-type="panel">
      <div data-accept-type="Col" data-area-type="Row" v-bind:data-col="i" class="row" v-for="(row, i) in rows" :key="i">
        <div data-accept-type="Btn"  data-area-type="Col" v-bind:data-col="j" class="col" v-for="(col, j) in row.cols" :key="j">
          <button v-for="(btn, k) in col.children" :key="k">{{ btn.content }}</button>
        </div>
      </div>

    </div>
    <div id="draggable" :style="{left: drag.x + 'px', top: drag.y + 'px'}" v-if="drag.isDragging">{{ drag.type }}</div>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data: () => ({
    drag: {
      x0: 0,
      y0: 0,
      dx: 0,
      dy: 0,
      x: 0,
      y: 0,
      isDragging: false,
      type: ''
    },
    rows: [
      {
        type: 'Row',
        height:300,
        cols: [
          {
            type: 'Col',
            width: 200,
            children: [
              {
                type: 'Btn',
                content: '按钮'
              },
              {
                type: 'Btn',
                content: '按钮'
              }
            ]
          }
        ]
      }
    ]
  }),
  methods: {
    dragElement(type){
      this.drag.type = type
      let move = e => {
        this.drag.isDragging = true
        this.drag.x = e.clientX + 10
        this.drag.y = e.clientY + 10
      }

      let up = e => {
        document.removeEventListener("mousemove", move)
        document.removeEventListener("mouseup", up)
        this.drag.isDragging = false
        let areaElement = document.elementFromPoint(e.clientX, e.clientY)
        let current = areaElement
        let type = this.drag.type
        while(current && current.dataset.acceptType !== type){
          current = current.parentElement
          console.log(current)
        }
        console.log(current)
        if(!current){return}
        if(type === 'Row'){
          this.rows.push({type: 'Row', cols: []})
        }
        if(type === 'Col'){
          this.rows[current.dataset['Row']].cols.push({type: 'Col', children: []})
        }
      }
      document.addEventListener("mousemove", move)
      document.addEventListener("mouseup", up)
    }
  }
}
</script>

<style>
#container {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

#sidebar{
  width: 100px;
  height: 100%;
  background: lemonchiffon;
}

#sidebar>*{
  width: 60px;
  height: 60px;
  display: inline-block;
  margin: 10px;
  box-sizing: border-box;
  border: solid 1px black;
  user-select: none;
}

#edit-panel{
  flex: 1;
  overflow: scroll;
}

.row{
  width: 100%;
  min-height: 300px;
  background-color: #eeee88;
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  margin-top: 16px;
}

.col{
  height: 100px;
  background-color: lightgreen;
  padding: 20px;
  min-height: 200px;
  min-width: 200px;;
}

#draggable{
  position: absolute;
  width: 60px;
  height: 60px;
  display: inline-block;
  margin: 10px;
  box-sizing: border-box;
  border: solid 1px black;
  user-select: none;
}

</style>
