import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { loadModels, getFullFaceDescription, createMatcher } from '../api/face';

// Import image to test API
const testImg = require('../img/test.jpg');

// Import face profile
const JSON_PROFILE = require('../descriptors/bnk48.json');

// Initial State
const INIT_STATE = {
  imageURL: testImg,
  fullDesc: null,
  detections: null,
  descriptors: null,
  match: null
};

class ImageInput extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INIT_STATE, faceMatcher: null };
  }

  componentWillMount = async () => {
    await loadModels();
    this.setState({ faceMatcher: await createMatcher(JSON_PROFILE) });
    await this.handleImage(this.state.imageURL);
  };

  handleImage = async (image = this.state.imageURL) => {
    await getFullFaceDescription(image).then(fullDesc => {
        console.log(fullDesc);
        var t = document.getElementById("text");
       // t.innerHTML = JSON.stringify(fullDesc);
       var s = {"0":-0.1639018952846527,"1":0.11222736537456512,"2":0.09772752225399017,"3":0.037998784333467484,"4":-0.012922480702400208,"5":0.012417588382959366,"6":0.05849345400929451,"7":0.014060892164707184,"8":0.1434122771024704,"9":-0.03666205331683159,"10":0.20124809443950653,"11":-0.04960758984088898,"12":-0.24926477670669556,"13":-0.0931999683380127,"14":0.08305775374174118,"15":0.19654685258865356,"16":-0.17057159543037415,"17":-0.09302739799022675,"18":-0.10621656477451324,"19":-0.1002708300948143,"20":-0.004271773621439934,"21":0.060032788664102554,"22":-0.06821975857019424,"23":0.09253304451704025,"24":-0.09949198365211487,"25":-0.3379365801811218,"26":-0.03193078562617302,"27":-0.17260859906673431,"28":0.025140883401036263,"29":-0.07542446255683899,"30":-0.052519991993904114,"31":0.08583436161279678,"32":-0.1686229407787323,"33":-0.05181775242090225,"34":-0.04049626365303993,"35":-0.02962392568588257,"36":0.01921900175511837,"37":0.006474485155194998,"38":0.1799846738576889,"39":0.06826437264680862,"40":-0.11866672337055206,"41":-0.009887286461889744,"42":-0.04955063387751579,"43":0.3543752133846283,"44":0.15692023932933807,"45":-0.01698358915746212,"46":0.010351119562983513,"47":0.023773401975631714,"48":0.023113759234547615,"49":-0.21777202188968658,"50":0.012708231806755066,"51":0.12196232378482819,"52":0.14366088807582855,"53":0.06490480899810791,"54":-0.049497392028570175,"55":-0.1844664216041565,"56":-0.05036814138293266,"57":-0.039836443960666656,"58":-0.22128815948963165,"59":0.04642422869801521,"60":0.016348743811249733,"61":-0.09015743434429169,"62":-0.10847548395395279,"63":-0.04518073797225952,"64":0.27540677785873413,"65":0.06471604108810425,"66":-0.09793979674577713,"67":-0.14980916678905487,"68":0.18333229422569275,"69":-0.09353850781917572,"70":0.028071869164705276,"71":0.07315205037593842,"72":-0.17320388555526733,"73":-0.1321316659450531,"74":-0.27438461780548096,"75":0.10264686495065689,"76":0.39934831857681274,"77":0.08439125865697861,"78":-0.25170084834098816,"79":0.002289729192852974,"80":-0.25121623277664185,"81":-0.017734035849571228,"82":0.043535083532333374,"83":0.02547701820731163,"84":-0.03190937638282776,"85":0.0012859376147389412,"86":-0.04444212093949318,"87":0.06263004243373871,"88":0.14144933223724365,"89":-0.021283837035298347,"90":-0.07812666893005371,"91":0.20281165838241577,"92":0.0647411048412323,"93":-0.053249239921569824,"94":0.01683289185166359,"95":-0.08089417964220047,"96":0.03605882078409195,"97":-0.07182225584983826,"98":-0.11897384375333786,"99":-0.051507361233234406,"100":-0.01181410439312458,"101":-0.09568393230438232,"102":0.0011612772941589355,"103":0.08571167290210724,"104":-0.2486068457365036,"105":0.19406266510486603,"106":0.13106587529182434,"107":-0.0022339262068271637,"108":0.011892459355294704,"109":0.10769405961036682,"110":-0.2139621078968048,"111":-0.05508706346154213,"112":0.22218404710292816,"113":-0.24582047760486603,"114":0.14799517393112183,"115":0.1774166077375412,"116":0.07793774455785751,"117":0.12509915232658386,"118":-0.002421458251774311,"119":0.08843602240085602,"120":-0.09240879118442535,"121":-0.01934049278497696,"122":-0.1543254405260086,"123":-0.008619965054094791,"124":0.16571730375289917,"125":0.0011422233656048775,"126":0.052061405032873154,"127":0.06691908836364746};
        var descrArray = [];
        t.innerHTML = "["
       for (let value in s)
       {
           t.innerHTML += s[value];
           t.innerHTML += ","
            descrArray.push(s[value]);
       }
       t.innerHTML +=  "]";
      if (!!fullDesc) {
        this.setState({
          fullDesc,
          detections: fullDesc.map(fd => fd.detection),
          descriptors: fullDesc.map(fd => fd.descriptor)
        });
      }
    });

    if (!!this.state.descriptors && !!this.state.faceMatcher) {
      let match = await this.state.descriptors.map(descriptor =>
        this.state.faceMatcher.findBestMatch(descriptor)
      );
      this.setState({ match });
    }
  };

  handleFileChange = async event => {
    this.resetState();
    await this.setState({
      imageURL: URL.createObjectURL(event.target.files[0]),
      loading: true
    });
    this.handleImage();
  };

  resetState = () => {
    this.setState({ ...INIT_STATE });
  };

  render() {
    const { imageURL, detections, match } = this.state;

    let drawBox = null;
    if (!!detections) {
      drawBox = detections.map((detection, i) => {
        let _H = detection.box.height;
        let _W = detection.box.width;
        let _X = detection.box._x;
        let _Y = detection.box._y;
        return (
          <div key={i}>
            <div
              style={{
                position: 'absolute',
                border: 'solid',
                borderColor: 'blue',
                height: _H,
                width: _W,
                transform: `translate(${_X}px,${_Y}px)`
              }}
            >
              {!!match && !!match[i] ? (
                <p
                  style={{
                    backgroundColor: 'blue',
                    border: 'solid',
                    borderColor: 'blue',
                    width: _W,
                    marginTop: 0,
                    color: '#fff',
                    transform: `translate(-3px,${_H}px)`
                  }}
                >
                  {match[i]._label}
                </p>
              ) : null}
            </div>
          </div>
        );
      });
    }

    return (
      <div>
       <div>
            <p id="text">
                Hello
            </p>
        </div>
        <input
          id="myFileUpload"
          type="file"
          onChange={this.handleFileChange}
          accept=".jpg, .jpeg, .png"
        />
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute' }}>
            <img src={imageURL} alt="imageURL" />
          </div>
          {!!drawBox ? drawBox : null}
        </div>
       
        
      </div>
    );
  }
}

export default withRouter(ImageInput);