import { useState, type ChangeEvent, useRef, useEffect } from 'react';
import { ChatStreaming } from '../assistants/gemini';
import ReactMarkdown from 'react-markdown';
import './chat-window.css';
import { Atom } from 'react-loading-indicators';

export const ChatWindow = () => {
    const [messages, setMessages] = useState<{ role: string, content: string }[]>([]);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const inputRef = useRef<HTMLTextAreaElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    async function handleSendMessage() {
        setIsLoading(true);
        setMessages((prevMessages) => [...prevMessages, {
            'role': 'user',
            'content': message
        }]);
        const currentMessage = message;
        setMessage('');

        try {
            const stream = ChatStreaming(currentMessage);

            let fullResponse = '';
            let isFirstChunk = true;

            for await (const chunk of stream) {
                fullResponse += chunk;

                if (isFirstChunk) {
                    isFirstChunk = false;
                    setIsLoading(false);
                    setMessages((prevMessages) => [...prevMessages, {
                        'role': 'assistant',
                        'content': fullResponse
                    }]);
                } else {
                    setMessages((prevMessages) => {
                        const newMessages = [...prevMessages];
                        const lastMessage = newMessages[newMessages.length - 1];
                        if (lastMessage.role === 'assistant') {
                            lastMessage.content = fullResponse;
                        }
                        return newMessages;
                    });
                }
            }
        } catch (error) {
            console.error(error);
            setIsLoading(false);
            setMessages((prevMessages) => [...prevMessages, {
                'role': 'assistant',
                'content': 'Sorry, something went wrong!!'
            }]);
        } finally {
            setIsLoading(false);
        }

        inputRef.current?.focus();
        if (inputRef.current) {
            inputRef.current.style.height = 'auto';
        }
    }

    function handleChange(event: ChangeEvent<HTMLTextAreaElement>): void {
        setMessage(event.target.value);
        if (inputRef.current) {
            inputRef.current.style.height = 'auto';
            inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
        }
    }

    return (
        <div className="chat-window">
            <div className="header">
                <img src="../public/chat-bot.png" alt="logo" />
                <h1 className='header-title'>AI Assistant</h1>
            </div>
            <div className="chat-container">
                {
                    messages.map((message, index) => (
                        <div
                            key={index}
                            className={`message-container ${message.role === "user" ? "user" : "assistant"
                                }`}
                        >
                            <p
                                className={`message ${message.role === "user" ? "user" : "assistant"
                                    }`}
                            >
                                <ReactMarkdown>{message.content}</ReactMarkdown>
                            </p>
                        </div>
                    ))
                }
                {isLoading && (
                    <div className='loader'>
                        <Atom color="#000" size="small" text="" textColor="#013974" />
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className='input-container'>
                <textarea
                    ref={inputRef}
                    placeholder="Ask me anything"
                    rows={1}
                    style={{ overflow: 'hidden' }}
                    className='input'
                    onChange={handleChange}
                    value={message}
                />
                <button
                    className='send-button'
                    onClick={handleSendMessage}
                    disabled={isLoading}
                >Send</button>
            </div>
        </div>
    )
}