import React from 'react';
import classNames from 'classnames';
import {getMetricValue, getMetricColor} from '../utils/metric-utils.js';
import {CANVAS_METRIC_FONT_SIZE} from '../constants/styles.js';

export default function NodeShapeSquare({
  id, highlighted, size, color, rx = 0, ry = 0, metric
}) {
  const rectProps = (scale, radiusScale) => ({
    width: scale * size * 2,
    height: scale * size * 2,
    rx: (radiusScale || scale) * size * rx,
    ry: (radiusScale || scale) * size * ry,
    x: -size * scale,
    y: -size * scale
  });

  const clipId = `mask-${id}`;
  const {height, value, formattedValue} = getMetricValue(metric, size);
  const className = classNames('shape', {
    metrics: value !== null
  });
  const fontSize = size * CANVAS_METRIC_FONT_SIZE;
  const metricStyle = {
    fill: getMetricColor(metric)
  };

  return (
    <g className={className}>
      <defs>
        <clipPath id={clipId}>
          <rect
            width={size}
            height={size}
            x={-size * 0.5}
            y={size * 0.5 - height}
            />
        </clipPath>
      </defs>
      {highlighted && <rect className="highlighted" {...rectProps(0.7)} />}
      <rect className="border" stroke={color} {...rectProps(0.5, 0.5)} />
      <rect className="shadow" {...rectProps(0.45, 0.39)} />
      <rect className="metric-fill" style={metricStyle}
        clipPath={`url(#${clipId})`} {...rectProps(0.45, 0.39)} />
      {highlighted && value !== null ?
        <text style={{fontSize}}>
          {formattedValue}
        </text> :
        <circle className="node" r={Math.max(2, (size * 0.125))} />}
    </g>
  );
}
