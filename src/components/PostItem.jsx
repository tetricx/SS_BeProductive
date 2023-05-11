import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'reactstrap';
import { connect } from 'react-redux';
import moment from 'moment';
import { getMoodIcon } from 'utilities/weather.js';
import { createVote, setTooltipToggle, toggleTooltip } from 'states/post-actions.js';
import './PostItem.css';

function PostItem(props) {
    //TODO
    
    const handleClick = () => {
        props.dispatch(setTooltipToggle(props.id, true));
    }
    const handleTooltipToggle= () => {
        props.dispatch(toggleTooltip(props.id));
    }
    const handleVote = (vote) => {
        props.dispatch(createVote(props.id, vote));
        props.dispatch(setTooltipToggle(props.id, false));
    }




    return (
        <div className="post-item d-flex flex-column" onClick={handleClick}>
            <div className="post d-flex">
                <div className="mood">
                    <i className={getMoodIcon(props.mood)}></i>
                </div>
                <div className="wrap">
                    <div className="ts">{moment(props.ts * 1000).calendar()}</div>
                    <div className="text">{props.text}</div>
                </div>
            </div>
            <div className="vote d-flex justify-content-end">
                <div className="vote-results">
                    {props.clearVotes > 0 && (<span><i className={getMoodIcon('Clear')}></i>&nbsp;{props.clearVotes}&nbsp;&nbsp;</span>)}
                    {props.cloudsVotes > 0 && <span><i className={getMoodIcon('Clouds')}></i>&nbsp;{props.cloudsVotes}&nbsp;&nbsp;</span>}
                    {props.drizzleVotes > 0 && <span><i className={getMoodIcon('Drizzle')}></i>&nbsp;{props.drizzleVotes}&nbsp;&nbsp;</span>}
                    {props.rainVotes > 0 && <span><i className={getMoodIcon('Rain')}></i>&nbsp;{props.rainVotes}&nbsp;&nbsp;</span>}
                    {props.thunderVotes > 0 && <span><i className={getMoodIcon('Thunder')}></i>&nbsp;{props.thunderVotes}&nbsp;&nbsp;</span>}
                    {props.snowVotes > 0 && <span><i className={getMoodIcon('Snow')}></i>&nbsp;{props.snowVotes}&nbsp;&nbsp;</span>}
                    {props.windyVotes > 0 && <span><i className={getMoodIcon('Windy')}></i>&nbsp;{props.windyVotes}&nbsp;&nbsp;</span>}
                </div>
                <div className="vote-plus">
                    <i id={`post-item-vote-${props.id}`} className="fa fa-plus"></i>
                </div>
            </div>
            <Tooltip placement="left" isOpen={props.tooltipOpen} autohide={false} target={`post-item-vote-${props.id}`} toggle={handleTooltipToggle}>
                <i className={`vote-tooltip ${getMoodIcon('Clear')}`} onClick={() => handleVote('Clear')}></i>&nbsp;
                <i className={`vote-tooltip ${getMoodIcon('Clouds')}`} onClick={() => handleVote('Clouds')}></i>&nbsp;
                <i className={`vote-tooltip ${getMoodIcon('Drizzle')}`} onClick={() => handleVote('Drizzle')}></i>&nbsp;
                <i className={`vote-tooltip ${getMoodIcon('Rain')}`} onClick={() => handleVote('Rain')}></i>&nbsp;
                <i className={`vote-tooltip ${getMoodIcon('Thunder')}`} onClick={() => handleVote('Thunder')}></i>&nbsp;
                <i className={`vote-tooltip ${getMoodIcon('Snow')}`} onClick={() => handleVote('Snow')}></i>&nbsp;
                <i className={`vote-tooltip ${getMoodIcon('Windy')}`} onClick={() => handleVote('Windy')}></i>
            </Tooltip>
        </div>
    );
}

PostItem.propTypes = {
    id: PropTypes.string,
    mood: PropTypes.string,
    text: PropTypes.string,
    clearVotes: PropTypes.number,
    cloudsVotes: PropTypes.number,
    drizzleVotes: PropTypes.number,
    rainVotes: PropTypes.number,
    thunderVotes: PropTypes.number,
    snowVotes: PropTypes.number,
    windyVotes: PropTypes.number,
    tooltipOpen: PropTypes.bool,
    dispatch: PropTypes.func,
};

export default connect((state, ownProps) => ({
    tooltipOpen: state.postItem.tooltipOpen[ownProps.id] ? true : false,
}))(PostItem);