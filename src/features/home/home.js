import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from "../../components/button.styled"
import { Typography } from "../../components/styles/typography.styled"
import { TextArea } from '../../components/textarea.styled';
import { Checkbox } from '../../components/checkbox.styled';
import { Select } from '../../components/select.styled';
import { useNavigate } from 'react-router-dom';
import style from './home.module.css';
import { updateSession, updateBoxes, updateTimeDisplay, updateShowResults, resetSettings } from '../../features/settings/settingsReducer';

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { session, boxes, time_display_boxes, showResults } = useSelector(state => state.settings);

    useEffect(() => {
        dispatch(resetSettings());
    }, [dispatch]);

    const handleSessionChange = (event) => {
        dispatch(updateSession(event.target.value));
    };

    const handleBoxesChange = (event) => {
        dispatch(updateBoxes(event.target.value));
    };

    const handleTimeDisplayChange = (event) => {
        dispatch(updateTimeDisplay(event.target.value));
    };

    const handleShowResultsChange = (event) => {
        dispatch(updateShowResults(event.target.checked));
    };

    return (
        <div className={style.root}>
            <Typography variant="h1">Game Settings</Typography>
            <div className={style.form}>
                <Typography>Session (1-10):</Typography>
                <TextArea value={session} onChange={handleSessionChange} />

                <Typography>Time Display (600-2000 ms):</Typography>
                <TextArea value={time_display_boxes} onChange={handleTimeDisplayChange} />

                <Typography>Boxes:</Typography>
                <Select value={boxes} onChange={handleBoxesChange}>
                    <option value={32}>32</option>
                    <option value={64}>64</option>
                    <option value={96}>96</option>
                    <option value={128}>128</option>
                </Select>
                <div className={style.check}>
                    <Checkbox checked={showResults} onChange={handleShowResultsChange} />
                    <Typography>Show Results Each Round</Typography>
                </div>
                <div className={style.button}>
                    <Button onClick={() => navigate('/bret')}>Start Game</Button>
                </div>
            </div>
        </div>
    );
}

export default Home