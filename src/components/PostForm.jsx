import React, { useRef} from 'react';
import PropTypes from 'prop-types';
import {
    Alert,
    Input,
    Button,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { getMoodIcon } from 'utilities/weather.js';
import {connect} from 'react-redux';
import {
    createPost,
    input,
    inputDanger,
    toggleMood,
    setMoodToggle,
    selectMood
} from 'states/post-actions.js';

import './PostForm.css';

function PostForm (props){
    const inputEl = useRef(null);
    const handleMoodToggle = () => {
        setMoodToggle(!props.moodToggle);
        props.dispatch(toggleMood())
    }
    const handleDropdownSelect = (mood) => {
        //come back to this later
        props.dispatch(selectMood(mood))
    }
    const handlePost = () => {
        if(props.mood === 'na'){
            props.dispatch(setMoodToggle(true));
        }
        if(!props.inputValue){
            props.dispatch(inputDanger(true));
        }
        props.dispatch(createPost(props.mood, props.inputValue));
        props.dispatch(input(''));
        props.dispatch(selectMood('na'));
    }
    const handleInputChange = (e) => {
        const text = e.target.value
        props.dispatch(input(text));
        if(text && props.inputDanger){
            props.dispatch(inputDanger(false));
        }
    }
    const inputDangerClass = () => {
        props.dispatch(inputDanger(props.inputDanger));
    }
    // TODO
    //handleDropdownSelect
    //handlePost
    //handleInputChange
    //inputDangerClass
    props.dispatch
    return (
        <div className="post-form">
            <Alert color='info' className={`d-flex flex-column flex-sm-row justify-content-center ${inputDangerClass}`}>
                <div className='mood align-self-start'>
                    <ButtonDropdown type='buttom' isOpen={props.moodToggle} toggle={handleMoodToggle}>
                        <DropdownToggle className='mood-toggle' type='button' caret color="secondary">
                            <i className={getMoodIcon(props.mood)}></i>&nbsp;{
                                props.mood === 'na' ? 'Mood' : props.mood
                            }
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem type='button' onClick={() => handleDropdownSelect('Clear')}><i className={getMoodIcon('Clear')}></i>&nbsp;&nbsp;Clear</DropdownItem>
                            <DropdownItem type='button' onClick={() => handleDropdownSelect('Clouds')}><i className={getMoodIcon('Clouds')}></i>&nbsp;&nbsp;Clouds</DropdownItem>
                            <DropdownItem type='button' onClick={() => handleDropdownSelect('Drizzle')}><i className={getMoodIcon('Drizzle')}></i>&nbsp;&nbsp;Drizzle</DropdownItem>
                            <DropdownItem type='button' onClick={() => handleDropdownSelect('Rain')}><i className={getMoodIcon('Rain')}></i>&nbsp;&nbsp;Rain</DropdownItem>
                            <DropdownItem type='button' onClick={() => handleDropdownSelect('Thunder')}><i className={getMoodIcon('Thunder')}></i>&nbsp;&nbsp;Thunder</DropdownItem>
                            <DropdownItem type='button' onClick={() => handleDropdownSelect('Snow')}><i className={getMoodIcon('Snow')}></i>&nbsp;&nbsp;Snow</DropdownItem>
                            <DropdownItem type='button' onClick={() => handleDropdownSelect('Windy')}><i className={getMoodIcon('Windy')}></i>&nbsp;&nbsp;Windy</DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>
                </div>
                <Input className='input' type='textarea' innerRef={inputEl} value={props.inputValue} onChange={handleInputChange} placeholder="What's on your mind?"></Input>
                <Button className='btn-post align-self-end' color="info" onClick={handlePost}>Post</Button>
            </Alert>
        </div>
    );
};

PostForm.propTypes = {
    inputValue: PropTypes.string,
    inputDanger: PropTypes.bool,
    moodToggle: PropTypes.bool,
    mood: PropTypes.string,
    dispatch: PropTypes.func,
};

export default connect((state) => {
    return {
        ...state.postForm
      };
})(PostForm);