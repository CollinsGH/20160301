package com.weasley.ws;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

import javax.websocket.CloseReason;
import javax.websocket.EndpointConfig;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint("/customers")
public class CustomerService {
	Set<Session> openSessions = new HashSet<>();

	@OnOpen
	public void onOpen(Session session, EndpointConfig endpointConfig) {
		System.out.println("Connected: " + session.getId());
		openSessions.add(session);
	}
	
	@OnClose
	public void onClose(Session session, CloseReason closeReason) {
		System.out.println("Closed: " + session);
		openSessions.remove(session);
	}
	
	@OnMessage
	public void onMessage(String message, Session session) {
		System.out.println("Message Received: " + message);
		try {
			// Echo back just to the originator for now
			// session.getBasicRemote().sendText(message);
			// Send to all open sessions
			System.out.println("#Open Sessions: " + openSessions.size());
			for (Session openSession : openSessions) {
				System.out.println("Sending to: " + openSession.getId());
				openSession.getBasicRemote().sendText(message);
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}
	
	@OnError
	public void onError(Session session, Throwable throwable) {
		System.out.println("Error: " + session + ": " + throwable.getMessage());
	}
	
	
}
