
import { animate, keyframes, query, stagger, state, style, transition, trigger } from '@angular/animations';



export let fade=  trigger('fade',[
  state('void',style({opacity:'0'})),

  transition("void<=>*",[

    animate(1500)
  ])
])



export let staggering= trigger('listAnimation',[
  transition('*=>*',[
    query(':enter',style({opacity:0}),{optional:true}),
    query(':enter',stagger('300ms',[
      animate('1s ease-in',keyframes([
        style({opacity:0,transform:'translateY(-75px)',offset:0}),
        style({opacity:0.5,transform:'translateY(35px)',offset:0.3}),
        style({opacity:1,transform:'translateY(0px)',offset:1})

      ]))
    ]),{optional:true})
  ])
])


