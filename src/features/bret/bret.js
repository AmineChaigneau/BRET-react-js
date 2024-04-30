import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button } from "../../components/button.styled"
import { Typography } from "../../components/styles/typography.styled"
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import style from './bret.module.css'
import bomb from './bomb.svg'
import checked from './checked.svg'
import reward from './reward.svg'

const BoxContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: 40px;
    border: solid 1px #A5A5A5;
    box-shadow: 0px 2px 6px 3px rgba(165,165,165,0.21);
    
    .unshow {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background: ${((props) => props.show ? 'transparent' : 'white')};
        z-index: 4;
    }

    .check {
        visibility: ${((props) => props.check ? 'visible' : 'hidden')};
        position: absolute;
        bottom: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background: url(${checked});
        background-size: 100% 100%;
        z-index: 5;
    }

    .bottom {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 5px;
        width: 100%;
        background: #2EA44F66;
        z-index: 5;
    }

    #bomb {
        background: url(${bomb}), #D24B4B66;
    }

    #reward {
        background: url(${reward}), #2EA44F66;
    }

`

const BoxContent = styled.div`
    height: 40px;
    width: 40px;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 2;
`

const Box = ({ boxId, id, children, show, check, ...props }) => {

    return (
        <BoxContainer boxId={boxId} show={show} check={check} {...props}>
            <BoxContent id={id} />
            <div className='check'></div>
            <div className='bottom'></div>
            <div className='unshow'></div>
        </BoxContainer>
    )
}

const Bret = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { session, boxes, time_display_boxes, showResults } = useSelector(state => state.settings);

    function range(start = 1, end = 10) {
        const ans = [];
        for (let i = start; i <= end; i++) {
            ans.push(i);
        }
        return ans;
    }

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    };

    const arr = range(0, (boxes - 1))

    const [bomb, setBomb] = useState(Math.round(getRandomArbitrary(0, (boxes - 1))))

    const [checkedBox, setCheckedBox] = useState(new Array(boxes).fill(false))

    const [show, setShow] = useState(new Array(boxes).fill(false))

    const [disabled, setDisabled] = useState({ start: false, stop: true, reveal: true, output: true })

    const [isActive, setIsActive] = useState(false);

    const [isPaused, setIsPaused] = useState(true);

    const [output, setOutput] = useState(false);

    const [time, setTime] = useState(0);

    const [value, setValue] = useState(0);

    const [round, setRound] = useState(1);

    const [data, setData] = useState([]);

    useEffect(() => {
        let interval = null;
        // console.log('init')
        if (isActive && isPaused === false) {
            interval = setInterval(() => {
                setTime((time) => time + time_display_boxes);
            }, time_display_boxes);
        } else {
            clearInterval(interval);
            // console.log('clear')
        }
        return () => {
            clearInterval(interval);
            // console.log('return clear')
        };
    }, [isActive, isPaused]);

    useEffect(() => {
        if (isActive && isPaused === false) {

            if (value < boxes) {
                const newArr = [...checkedBox]

                const indices = newArr.flatMap((bool, index) => bool ? [] : index)

                const randomIndex = Math.floor(Math.random() * indices.length);

                const reveal = indices[randomIndex]

                newArr[reveal] = !newArr[reveal]

                setCheckedBox(newArr)

                setValue(value + 1)
            } else {
                handlePause();
            }
        }
    }, [time]);

    const handleTrialStart = () => {
        setIsActive(true);
        setIsPaused(false);
        setDisabled({ ...disabled, start: true, stop: false })
    }

    const handlePause = () => {
        setIsPaused(!isPaused)
        setDisabled({ ...disabled, start: false, stop: true, reveal: false })
    }

    const handleEndTrial = () => {
        setShow(checkedBox)

        const newArr = []
        for (let i = 0; i < checkedBox.length; i++) {
            if (String(checkedBox[i]).indexOf(true) >= 0) {
                newArr.push(i)
            }
        }
        setOutput(newArr.indexOf(bomb) !== -1)

        // console.log(newArr.indexOf(bomb) !== -1)
        // console.log(bomb)
        // console.log(checkedBox)

        setCheckedBox(new Array(boxes).fill(false))
        setDisabled({ ...disabled, start: true, output: false, reveal: true })
    }

    const handleNextRound = () => {
        const score = output ? 0 : value;

        setData([...data, value, score])

        setRound(round + 1)

        setBomb(Math.round(getRandomArbitrary(0, (boxes - 1))))

        setShow(new Array(boxes).fill(false))

        setDisabled({ ...disabled, start: false, stop: true, reveal: true, output: true })

        setValue(0)
        setTime(0)
    }

    const handleNextRoundNoDispaly = () => {
        const newArr = []
        for (let i = 0; i < checkedBox.length; i++) {
            if (String(checkedBox[i]).indexOf(true) >= 0) {
                newArr.push(i)
            }
        }
        setOutput(newArr.indexOf(bomb) !== -1)
        setCheckedBox(new Array(boxes).fill(false))

        //
        const score = output ? 0 : value;

        setData([...data, value, score])

        setRound(round + 1)

        setBomb(Math.round(getRandomArbitrary(0, (boxes - 1))))

        setShow(new Array(boxes).fill(false))

        setDisabled({ ...disabled, start: false, stop: true, reveal: true, output: true })

        setValue(0)
        setTime(0)
    }

    const handleRedirect = () => {
        console.log(data)
        navigate('/')
    }

    return (
        <div className={style.root}>
            <div className={style.boxContainer}>
                {arr.map((item, key) =>
                    <Box boxId={item} key={key} id={bomb === item ? 'bomb' : 'reward'} show={show[key]} check={checkedBox[key]}>
                    </Box>
                )}
                <div className={style.boxInfo}>
                    <div className={style.label}>
                        <Typography variant={'h5'}>Potential reward</Typography>
                        <Typography variant={'h4'}>{value}</Typography>
                    </div>
                    <div className={style.label}>
                        <Typography variant={'h5'}>Remaining boxes</Typography>
                        <Typography variant={'h4'}>{boxes - value}</Typography>
                    </div>
                </div>
                <div className={style.boxOutput} style={{ visibility: disabled.output ? 'hidden' : 'visible' }}>
                    {output ? (
                        <div className={style.output}>
                            <Typography variant={'h5'}>
                                Ooooops... <b>You picked up the box containing the bomb.</b>. !
                            </Typography>
                            <Box id='bomb' show={true} check={false} style={{ border: 'none' }} />
                        </div>
                    ) : (
                        <div className={style.output}>
                            <Typography variant={'h5'}>
                                Congratulations, <b>the bomb didn't explode</b>! You have won.
                            </Typography>
                            <Typography variant={'h4'}>{value}</Typography>
                        </div>
                    )}
                    {round === session ? (
                        <Button onClick={handleRedirect} style={{ display: disabled.output ? 'none' : '' }}>
                            Continue
                        </Button>
                    ) : (
                        <Button onClick={handleNextRound} style={{ display: disabled.output ? 'none' : '' }}>
                            Next round ({round}/{session})
                        </Button>
                    )}
                </div>
            </div>
            <div className={style.action}>
                <Button disabled={disabled.start} onClick={handleTrialStart}>Start</Button>
                <Button disabled={disabled.stop} onClick={handlePause}>Stop</Button>
                {showResults ? (
                    <Button disabled={disabled.reveal || disabled.start} onClick={handleEndTrial}>Reveal</Button>
                ) : (
                    <>
                    {round === session ? (
                        <Button disabled={disabled.reveal || disabled.start} onClick={handleRedirect}>
                            Continue
                        </Button>
                    ) : (
                        <Button disabled={disabled.reveal || disabled.start} onClick={handleNextRoundNoDispaly}>Next round ({round}/{session})</Button>
                    )}
                    </>
                    
                )}
            </div>
        </div>
    )
}

export default Bret