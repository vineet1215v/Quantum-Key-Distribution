import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Lock, Send, Shield, AlertTriangle, Check, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SecureMessage {
  id: string;
  original: string;
  encrypted: string;
  timestamp: Date;
  status: "sending" | "delivered" | "compromised";
}

interface SecureMessagingProps {
  hasSecureKey: boolean;
  quantumKey: number[];
  eveActive: boolean;
  isConnected: boolean;
}

export const SecureMessaging = ({ hasSecureKey, quantumKey, eveActive, isConnected }: SecureMessagingProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<SecureMessage[]>([]);
  const [allReceivedMessages, setAllReceivedMessages] = useState<Array<{id: string, text: string, timestamp: Date, status: string}>>([]);
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [keyUsageIndex, setKeyUsageIndex] = useState(0);
  const { toast } = useToast();

  // Enhanced One-Time Pad encryption using quantum key
  const encryptMessage = (text: string, startIndex: number): { encrypted: string, endIndex: number } => {
    const binary = text.split('').map(char => 
      char.charCodeAt(0).toString(2).padStart(8, '0')
    ).join('');
    
    let encrypted = '';
    let currentIndex = startIndex;
    
    for (let i = 0; i < binary.length; i++) {
      if (currentIndex >= quantumKey.length) {
        // Regenerate key when exhausted (in practice, you'd establish a new key)
        currentIndex = 0;
      }
      encrypted += (parseInt(binary[i]) ^ quantumKey[currentIndex]).toString();
      currentIndex++;
    }
    
    return { encrypted, endIndex: currentIndex };
  };

  const decryptMessage = (encryptedBinary: string, startIndex: number): string => {
    let decrypted = '';
    let currentIndex = startIndex;
    
    for (let i = 0; i < encryptedBinary.length; i++) {
      if (currentIndex >= quantumKey.length) {
        currentIndex = 0;
      }
      decrypted += (parseInt(encryptedBinary[i]) ^ quantumKey[currentIndex]).toString();
      currentIndex++;
    }
    
    // Convert binary back to text
    let result = '';
    for (let i = 0; i < decrypted.length; i += 8) {
      const byte = decrypted.substr(i, 8);
      if (byte.length === 8) {
        result += String.fromCharCode(parseInt(byte, 2));
      }
    }
    return result;
  };


  const sendMessage = async () => {
    if (!message.trim() || !hasSecureKey || quantumKey.length === 0) return;

    setIsTransmitting(true);
    const messageId = Date.now().toString();
    
    // Encrypt using the actual quantum key
    const { encrypted, endIndex } = encryptMessage(message, keyUsageIndex);
    
    const newMessage: SecureMessage = {
      id: messageId,
      original: message,
      encrypted,
      timestamp: new Date(),
      status: "sending"
    };

    setMessages(prev => [...prev, newMessage]);
    
    // Update key usage index for next message
    setKeyUsageIndex(endIndex);

    // Simulate transmission delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate Eve's interference if active
    let finalEncrypted = encrypted;
    let deliveryStatus: "delivered" | "compromised" = "delivered";
    
    if (eveActive) {
      // Eve intercepts and potentially corrupts the message
      const corruptionRate = 0.1; // 10% bit flip rate
      finalEncrypted = encrypted.split('').map(bit => 
        Math.random() < corruptionRate ? (bit === '0' ? '1' : '0') : bit
      ).join('');
      deliveryStatus = "compromised";
    }

    // Bob receives and decrypts using the same key index
    const decryptedMessage = decryptMessage(finalEncrypted, keyUsageIndex);
    
    // Add to Bob's received messages
    setAllReceivedMessages(prev => [...prev, {
      id: messageId,
      text: decryptedMessage,
      timestamp: new Date(),
      status: deliveryStatus
    }]);

    // Update message status
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, status: deliveryStatus }
        : msg
    ));

    setIsTransmitting(false);
    
    if (deliveryStatus === "delivered") {
      toast({
        title: "Message Delivered Securely",
        description: "Bob received your message without any errors.",
      });
    } else {
      toast({
        title: "Message Compromised",
        description: "Eve's interference detected! Message integrity violated.",
        variant: "destructive",
      });
    }

    setMessage("");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sending":
        return <div className="w-2 h-2 bg-quantum-alice rounded-full animate-pulse" />;
      case "delivered":
        return <Check className="w-4 h-4 text-quantum-entangled" />;
      case "compromised":
        return <AlertTriangle className="w-4 h-4 text-quantum-eve" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sending":
        return "border-quantum-alice text-quantum-alice";
      case "delivered":
        return "border-quantum-entangled text-quantum-entangled";
      case "compromised":
        return "border-quantum-eve text-quantum-eve";
      default:
        return "";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Alice's Secure Messaging Interface */}
      <Card className="p-6 border-quantum-alice/20">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="w-5 h-5 text-quantum-alice" />
          <h3 className="text-lg font-bold text-quantum-alice">Alice - Secure Messaging</h3>
          <div className="ml-auto flex items-center gap-2">
            {hasSecureKey ? (
              <Badge variant="outline" className="border-quantum-entangled text-quantum-entangled">
                <Lock className="w-3 h-3 mr-1" />
                Secured
              </Badge>
            ) : (
              <Badge variant="outline" className="border-quantum-eve text-quantum-eve">
                <AlertTriangle className="w-3 h-3 mr-1" />
                No Key
              </Badge>
            )}
            {eveActive && (
              <Badge variant="outline" className="border-quantum-eve text-quantum-eve animate-pulse">
                Eve Active
              </Badge>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Message to Send:</label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your secure message..."
              className="min-h-[100px] bg-muted/30 border-quantum-alice/20"
              disabled={!hasSecureKey || isTransmitting}
            />
          </div>

          <Button
            onClick={sendMessage}
            disabled={!hasSecureKey || !message.trim() || isTransmitting}
            className="w-full bg-quantum-alice hover:bg-quantum-alice/80"
          >
            {isTransmitting ? (
              <>
                <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Transmitting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Secure Message
              </>
            )}
          </Button>

          {/* Message History */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Transmission History:</h4>
            <div className="max-h-40 overflow-y-auto space-y-2">
              {messages.map((msg) => (
                <Card key={msg.id} className="p-3 bg-muted/20 border-quantum-alice/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground">
                      {msg.timestamp.toLocaleTimeString()}
                    </span>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(msg.status)}
                      <Badge variant="outline" className={`text-xs ${getStatusColor(msg.status)}`}>
                        {msg.status}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm truncate">{msg.original}</p>
                  <p className="text-xs font-mono text-muted-foreground mt-1 truncate">
                    Encrypted: {msg.encrypted.substring(0, 40)}...
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Bob's Message Reception */}
      <Card className="p-6 border-quantum-bob/20">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-quantum-bob" />
          <h3 className="text-lg font-bold text-quantum-bob">Bob - Message Reception</h3>
          <div className="ml-auto">
            {isConnected ? (
              <Badge variant="outline" className="border-quantum-entangled text-quantum-entangled">
                Connected
              </Badge>
            ) : (
              <Badge variant="outline" className="border-muted-foreground text-muted-foreground">
                Waiting
              </Badge>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Received Messages:</label>
            <div className="min-h-[150px] max-h-[300px] overflow-y-auto p-3 bg-muted/30 border border-quantum-bob/20 rounded-md space-y-2">
              {allReceivedMessages.length > 0 ? (
                allReceivedMessages.map((msg) => (
                  <Card key={msg.id} className={`p-3 ${msg.status === 'compromised' ? 'bg-quantum-eve/10 border-quantum-eve/20' : 'bg-quantum-entangled/10 border-quantum-entangled/20'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-muted-foreground">
                        {msg.timestamp.toLocaleTimeString()}
                      </span>
                      <Badge variant="outline" className={msg.status === 'compromised' ? 'border-quantum-eve text-quantum-eve' : 'border-quantum-entangled text-quantum-entangled'}>
                        {msg.status === 'compromised' ? 'Compromised' : 'Verified'}
                      </Badge>
                    </div>
                    <p className="text-sm">{msg.text}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                      <Lock className="w-3 h-3" />
                      <span>Decrypted using quantum key</span>
                    </div>
                  </Card>
                ))
              ) : (
                <p className="text-muted-foreground text-sm italic">
                  {hasSecureKey ? "Waiting for secure messages..." : "Establish secure connection first"}
                </p>
              )}
            </div>
          </div>

          {/* Security Status */}
          <Card className="p-3 bg-muted/20 border-quantum-entangled/10">
            <h4 className="text-sm font-medium mb-2 text-quantum-entangled">Security Status:</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span>Quantum Key:</span>
                <span className={hasSecureKey ? "text-quantum-entangled" : "text-quantum-eve"}>
                  {hasSecureKey ? `${quantumKey.length} bits` : "Not established"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Key Usage:</span>
                <span className="text-quantum-entangled">
                  {keyUsageIndex}/{quantumKey.length} bits used
                </span>
              </div>
              <div className="flex justify-between">
                <span>Channel Security:</span>
                <span className={eveActive ? "text-quantum-eve" : "text-quantum-entangled"}>
                  {eveActive ? "Compromised" : "Secure"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Message Integrity:</span>
                <span className={allReceivedMessages.length > 0 && !eveActive ? "text-quantum-entangled" : "text-quantum-eve"}>
                  {allReceivedMessages.length > 0 ? (eveActive ? "Violated" : "Verified") : "Pending"}
                </span>
              </div>
            </div>
          </Card>

          {/* Global Message Verification Status */}
          {allReceivedMessages.length > 0 && (
            <Card className={`p-3 ${eveActive ? "bg-quantum-eve/10 border-quantum-eve/20" : "bg-quantum-entangled/10 border-quantum-entangled/20"}`}>
              <div className="flex items-center gap-2 mb-2">
                {eveActive ? (
                  <AlertTriangle className="w-4 h-4 text-quantum-eve" />
                ) : (
                  <Check className="w-4 h-4 text-quantum-entangled" />
                )}
                <span className={`text-sm font-medium ${eveActive ? "text-quantum-eve" : "text-quantum-entangled"}`}>
                  {eveActive ? "Security Breach Detected" : `${allReceivedMessages.length} Messages Verified`}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {eveActive 
                  ? "Eve's interference detected. Some messages may be corrupted."
                  : `All ${allReceivedMessages.length} messages received with quantum-guaranteed security.`
                }
              </p>
            </Card>
          )}
        </div>
      </Card>
    </div>
  );
};