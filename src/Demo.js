import React,{useState } from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { useSpring, animated as a } from 'react-spring'
import TextField from '@material-ui/core/TextField';
import './style.css'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
   // height:"100%"
   boxShadow:'0px 0px 20px 0px #888888;'

  },
  root1: {
    width:'340px',
    height:'200px',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    boxShadow:'0px 0px 20px 0px #888888;'

  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const data = [{
    index:0,
    question:10,
    ans:10,
    hint:"hello hint 1"
},
{
    index:1,
    question:11,
    ans:10,
    hint:"hello hint 2"
},
{
    index:2,
    question:12,
    ans:10,
    hint:"hello hint 3"
},
{
    index:3,
    question:15,
    ans:10,
    hint:"hello hint 4"
}]

function Demo() {
    const classes = useStyles();

    const [currentAnswer, setCurrentAnswer] = useState("")
    const [index, setIndex] = useState(0)
    const [isShowHint, setShowHint] = useState(false)
    const [flipped, setFlipped] = useState(false)
    const [isCorrect, setCorrect] = useState(false)

    
    const { transform, opacity } = useSpring({
      opacity:  1,
      transform: `perspective(600px) rotateX(${flipped ? 360 : 0}deg)`,
      config: { mass: 5, tension: 500, friction: 80 }
    })



    const handleChangeInputAnswer = e => {
        setCurrentAnswer(e.target.value)
      }

      const handleOnKeyChange = (key)=>{
        if(key === 'enter'){
            setCorrect(true)
            setTimeout(function(){ 
                setIndex(index + 1)
                setShowHint(false)
                setFlipped(state => !state)
                setCurrentAnswer('')
                setCorrect(false)
             }, 1000);
        }else{
            setShowHint(true)
        }
      }

      const correntData = data && data.find(que=>que.index === index)


    return (

   <div>
      {/* <a.div className="c back" style={{ opacity: opacity.interpolate(o => 1 - o), transform }} /> */}
      {correntData ? 
      <a.div className="c" style={{ opacity, transform: transform.interpolate(t => `${t} rotateX(360deg)`) }} >
        <Card className={classes.root}>
                    <CardContent>
                        <div style={{display:"flex",justifyContent:'center',minHeight:"100px"}}>
                            {isCorrect && <CheckIcon style={{fontSize:"100px",color:"green"}}/>}
                        </div>

                            <div style={{display:"flex",justifyContent:'space-around',alignItems:'center',flexWrap:'wrap'}}>
                            <div style={{
                                    minWidth:'150px',
                                    minHeight:"52px",
                                    maxHeight:"52px",
                                    border:'2px solid rgb(97 86 210)',
                                    display:'flex',
                                    justifyContent:'center',
                                    alignItems:'center',
                                    borderRadius:"8px",
                                    fontSize:"26px"
                            }}>
                            {correntData && correntData.question}
                            </div>
                            <div style={{
                                    maxWidth:'150px',
                                   // border:'2px solid',
                                   minHeight:"52px",
                                    display:'flex',
                                    justifyContent:'center',
                                    alignItems:'center',margin:"24px"
                                    //marginTop:"24px"
                                   // borderRadius:"8px"
                            }}>
                           <KeyboardEventHandler
                            handleKeys={['enter', 'space']}
                            onKeyEvent={(key, e) =>handleOnKeyChange(key)} >

                            <TextField 
                            id="outlined-basic" 
                           // label="Answer" 
                            autoFocus
                            variant="outlined" 
                            type="text" 
                            onChange={handleChangeInputAnswer}
                            value={currentAnswer}
                            InputLabelProps={{
                                shrink: true,
                              }}
                            />
                        </KeyboardEventHandler>
                            </div>
                            
                        </div>
                   
                    </CardContent>
                    <CardActions style={{display:"flex",justifyContent:'center',minHeight:"100px"}}>
                    {isShowHint && ( <span style={{fontSize:"24px"}}>Hint: {correntData.hint}</span>)}
                    </CardActions>
                </Card>      
            </a.div>
            :
            <Card className={classes.root1}  style={{fontSize:"24px"}}>
                
            Thank You
            
        </Card> 
        }
    </div>    
    );
  }
  
  export default Demo;

