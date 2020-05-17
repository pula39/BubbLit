import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import './../../../css/shareSpace.css'
import { Button } from 'semantic-ui-react'

export default class MediaPanel extends Component {

    constructor(props) {
        super(props)
        this.state = {
            mediaURLInput: '',
            isShareProgress: true,
            isPlay: true,
            isMediaHost: false,
            isISharedMedia: false
        }
    }

    componentWillUpdate(nextProps, nextState) {

        // mediaplaytime 변경시 로직
        if (this.props.mediaPlaytime != nextProps.mediaPlaytime) {
            if ((Math.abs(this.player.getCurrentTime() - parseFloat(nextProps.mediaPlaytime)) >= 6) &&
                this.state.isShareProgress) {
                // [TODO] Time 에는 언제 보냈는지하고, 그때 몇초였는지가 필요.
                // 10분 13초에 영상이 1분 2초였다. 
                // 그러면 10분 33초에 들어온사람은 영상을 1분 22초부터 틀어준다
                // 갱신시간으로부터 20초 지났기때문에.
                // 좀 해보니까, 로딩때문에 seek을 2번 해줘야할거같음.
                // 첫번째 seek은 로딩때문에 뿌린사람이랑 어긋남.

                // 위에꺼 걍 5초주기로 호스트가 뿌려주면 될듯
                let time = parseFloat(nextProps.mediaPlaytime);

                if (this.player != null) {
                    console.log("tried to seek to ", time)
                    this.player.seekTo(time)
                } else {
                    console.error("NO Player but tried to seek playtime")
                }
            }
        }

        // isPlay 변경시 로직
        if (this.state.isPlay != nextProps.isPlay) {
            this.setState({
                isPlay: nextProps.isPlay
            })
        }

        // 유튜브 링크 변경시 로직
        if (this.props.mediaURL != nextProps.mediaURL) {
            if (this.state.isISharedMedia) {
                this.setState({
                    isMediaHost: true,
                    isISharedMedia: false
                })
            }
        }
    }

    handleMediaUrlInput(event) {
        this.setState({
            mediaURLInput: event.target.value
        })
    }

    handleMediaUrlClick(event) {
        event.preventDefault();
        var _mediaURLInput = this.state.mediaURLInput
        // 반드시 아래의 tab_action보다 먼저 일어나야 하므로 먼저 할당함.
        // [TODO] isMediaHost를 로컬에서 변경하지 않고, 브로드캐스트 된 정보에서 유저id를 이용하여 설정하도록 하자.
        this.setState({
            isISharedMedia: true,
            mediaURLInput: ''
        }, () => {
            this.props.channel.push("tab_action", { type: "media_link", body: _mediaURLInput })
        })
    }

    handleProgress(event) {
        // 내가 호스트면 현재 진행상황을 보냄.
        // 이걸 안보내면 새로 들어온 사람의 동기화가 안되니, 호스트는 체크박스 풀어도 이거 강제로 보내진다...
        if (this.state.isMediaHost) {
            this.props.sendTabAction("media_current_play", this.player.getCurrentTime())
        }
    }

    handlePause() {
        console.log("멈춤")
        if (this.state.isShareProgress) {
            this.props.sendTabAction("media_is_play", false)
        }
    }

    handleStart() {
        console.log("재생")
        console.log(this.player.getCurrentTime())
        // Resume 및 첫 Start 때도 작동함. onStart callback시 자동으로 실행됨.
        // ...자동으로 실행되는줄 알았는데 Resume 전(버퍼링 끝나기 전)에 상대로부터 정지요청 들어오면 그대로 정지해서 Start 작동 안함.
        if (this.state.isShareProgress) {
            this.props.sendTabAction("media_current_play", this.player.getCurrentTime())
            this.props.sendTabAction("media_is_play", true)
        }
    }


    toggleShareProgressChange() {
        this.setState({
            isShareProgress: !this.state.isShareProgress
        })
    }

    ref = player => {
        // ref로 연결함으로서 인스턴스처럼 아래의 ReactPlayer를 부를 수 있음.
        // ex) this.player.getCurrentTime()
        this.player = player
    }

    render() {
        return (
            <div className="outerfit">
                <ReactPlayer url={this.props.mediaurl}
                    ref={this.ref}
                    width="100%"
                    height="80%"
                    playing={this.state.isPlay}
                    controls={true}
                    onPause={this.handlePause.bind(this)}
                    onPlay={this.handleStart.bind(this)} />
                <input
                    className="input"
                    type="text"
                    value={this.state.mediaurlinput}
                    onChange={this.handleMediaUrlInput.bind(this)}
                />
                <Button onClick={this.handleMediaUrlClick.bind(this)}>미디어 링크 변경</Button>
                <br />
                미디어 재생시간 공유하기
                <input type='checkbox' checked={this.state.isShareProgress}
                    onChange={this.toggleShareProgressChange.bind(this)} />
                <br />
                <font>지원 미디어: 트위치(라이브 스트리밍), 유튜브, 사운드 클라우드, 페이스북 등</font>

                <div>미디어의 링크를 올린 다음, 미디어 링크 변경 버튼을 클릭해 다른사람에게 공유해보세요.</div>
                <div>미디어 재생시간 동기화 버튼을 클릭해, 다른사람들을 자신이 보고 있는 시간으로 이동시키세요.</div>
            </div>
        )
    }
}