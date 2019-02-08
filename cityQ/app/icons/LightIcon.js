import React from 'react'
import Svg, { Defs, Path, G, Mask, Use } from 'react-native-svg'

const LightIcon = props => (
  <Svg width={30} height={18} {...props}>
    <Defs>
      <Path id="prefix__a" d="M0 .057h14.193v17.681H0z" />
    </Defs>
    <G fill="none" fillRule="evenodd" transform="translate(.667)">
      <Mask id="prefix__b" fill="#fff">
        <Use xlinkHref="#prefix__a" />
      </Mask>
      <Path
        stroke={props.fill}
        strokeWidth={2.2}
        d="M8.84 1.157c-4.275 0-7.752 3.486-7.74 7.763.012 4.26 3.526 7.718 7.826 7.718h4.039c.07 0 .128-.057.128-.128V1.285a.128.128 0 0 0-.128-.128H8.84z"
        mask="url(#prefix__b)"
      />
      <Path
        fill={props.fill}
        stroke={props.fill}
        strokeWidth={0.5}
        d="M19.842 8.076h8.308a.85.85 0 1 1 0 1.699h-8.308a.85.85 0 0 1 0-1.7m-.488-5.392l8.152-1.609a.85.85 0 0 1 .998.67h0a.85.85 0 0 1-.669.997L19.684 4.35a.85.85 0 0 1-.999-.67h0a.85.85 0 0 1 .67-.997m-.67 11.487h0a.85.85 0 0 1 .999-.67l8.151 1.61c.46.09.76.537.67.997h0a.85.85 0 0 1-.999.67l-8.151-1.609a.85.85 0 0 1-.67-.998"
      />
    </G>
  </Svg>
)

export default LightIcon
