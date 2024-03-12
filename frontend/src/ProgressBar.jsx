import React, { useEffect, useMemo, useCallback } from 'react';
import { Line } from 'progressbar.js';
import './ProgressBar.css';

const wrapper = document.createElement('div');

const ProgressLine = ({ animate }) => {
    const bar = useMemo(
        () =>
            new Line(wrapper, {
                strokeWidth: 4,
                easing: 'easeInOut',
                // duration: 1400,
                color: '#FFEA82',
                trailColor: '#eee',
                trailWidth: 1,
                svgStyle: { width: '100%', height: '100%' },
                from: { color: '#FFEA82' },
                to: { color: '#ED6A5A' },
                step: (state, bar) => {
                    bar.path.setAttribute('stroke', state.color);
                }
            }),
        []
    );

    const node = useCallback(node => {
        if (node) {
            node.appendChild(wrapper);
        }
    }, []);

    useEffect(() => {
        bar.animate(animate);
    }, [animate, bar]);

    return <div id="progress-container" ref={node} />;
};

export default ProgressLine;
