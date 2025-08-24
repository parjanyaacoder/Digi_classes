

import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";

import {useNavigate} from 'react-router-dom';
import Main from "../Main/Main";


import { useLocation } from "react-router-dom";


const Container = styled.div`
    padding: 20px;
    display: flex;
    height: 100vh;
    width: 100%;
    margin: auto;
    flex-wrap: wrap;
`;




const StyledVideo = styled.video`
    height: 40%;
    width: 50%;
`;

const Video = (props) => {
    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    }, []);

    return (
        <StyledVideo playsInline autoPlay ref={ref} />
    );
}


const videoConstraints = {
    height: window.innerHeight / 2,
    width: window.innerWidth / 2,

};

const Room = (props) => {

    // console.log(props)

    const [peers, setPeers] = useState([]);
    const socketRef = useRef();
    const userVideo = useRef();
    const peersRef = useRef([]);
    console.log(props);
    const roomID = props.roomID;




    const historyy=useNavigate()
    const location=useLocation()
    const propsd={history:{historyy,location}}
    


    useEffect(() => {

        (async() => {
            const result_main= await Main({...propsd});

             

        if(result_main===true){
       


            socketRef.current = io.connect('/', {path: '/bar'});

            // socketRef.current = io('/my-namespace', { path: '/myapp/socket.io'});


            navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
                userVideo.current.srcObject = stream;
                socketRef.current.emit("join room", roomID);
                socketRef.current.on("all users", users => {
                    const peers = [];
                    users.forEach(userID => {
                        const peer = createPeer(userID, socketRef.current.id, stream);
                        peersRef.current.push({
                            peerID: userID,
                            peer,
                        })
    
                        peers.push({
                            peerID:userID,
                            peer,
                        });
    
                        
                    })
                    setPeers(peers);
                })
    
                socketRef.current.on("user joined", payload => {
                    const peer = addPeer(payload.signal, payload.callerID, stream);
                    peersRef.current.push({
                        peerID: payload.callerID,
                        peer,
                    })
    
                    const peerObj={
                        peer,
                        peerID:payload.callerID
                    }
    
                    setPeers(users => [...users, peerObj]);
                });
    
                socketRef.current.on("receiving returned signal", payload => {
                    const item = peersRef.current.find(p => p.peerID === payload.id);
                    item.peer.signal(payload.signal);
                });
    
    
                socketRef.current.on("user left",id=>{
                    const peerObj=peersRef.current.find(p=> p.peerID === id);
                    if(peerObj){
                        peerObj.peer.destroy();
                    }
                    const peers=peersRef.current.filter(p => p.peerID!==id);
                    peersRef.current=peers;
                    setPeers(peers); 
                })
    
    
    
            })

        }


          })()

   }, []);

    function createPeer(userToSignal, callerID, stream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer.on("signal", signal => {
            socketRef.current.emit("sending signal", { userToSignal, callerID, signal })
        })

        return peer;
    }

    function addPeer(incomingSignal, callerID, stream) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        })

        peer.on("signal", signal => {
            socketRef.current.emit("returning signal", { signal, callerID })
        })

        peer.signal(incomingSignal);

        return peer;
    }

    return (
        <Container>
            <StyledVideo muted ref={userVideo} autoPlay playsInline id='videoelementuser'  />
            {peers.map((peer, index) => {
                return (
                    <Video key={peer.peerID} peer={peer.peer}  />
                );
            })}
        </Container>
    );
};


export default Room;