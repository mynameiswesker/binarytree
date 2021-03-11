import LeaderLine from 'react-leader-line'
export function line(){

    let divs = document.getElementsByClassName('circle')

    let create_line = (from,to)=>{

        let coord_from = from.getBoundingClientRect()
        let coord_to = to.getBoundingClientRect()

        let X_from = coord_from.x + coord_from.width/2 + 'px'
        let Y_from = coord_from.y + coord_from.height + 'px'

        let X_to = coord_to.x + coord_to.width/2 + 'px'
        let Y_to = coord_to.y -2 + 'px'

        //console.log(coord_from,coord_to)

        let line1 = document.createElement('DIV')
        line1.classList.add('line')
        document.body.append(line1)
        line1.style.left = X_from
        line1.style.top = Y_from

        let line2 = document.createElement('DIV')
        line2.classList.add('line')
        document.body.append(line2)
        line2.style.left = X_to
        line2.style.top = Y_to

    }

//опускаемся по пирамиде сверху вниз по левой и правой части

    /* for(let div of divs){
        
        let from = div
        if(div.parentNode.childNodes[1]){

            let to1 = div.parentNode.childNodes[1].childNodes[0].childNodes[0]
            let to2 = div.parentNode.childNodes[1].childNodes[1].childNodes[0]

            create_line(from,to1)
            create_line(from,to2)
        }
    } */
    
}

export default line