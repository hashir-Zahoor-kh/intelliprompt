// renderer/src/components/TerminalPane.tsx

import React, { useRef, useEffect } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css'; // Import the CSS for xterm

function TerminalPane() {
  const termRef = useRef(null); // Create a ref to hold the terminal's DOM element

  // The useEffect hook runs after the component has been rendered to the DOM
  useEffect(() => {
    if (termRef.current) {
      // Initialize the terminal
      const term = new Terminal({
        cursorBlink: true,
        theme: {
          background: '#252526', // Match our pane background
        },
      });

      // Initialize and load the FitAddon
      const fitAddon = new FitAddon();
      term.loadAddon(fitAddon);

      // "Open" the terminal into our div
      term.open(termRef.current);

      // Make the terminal fit the size of its container
      fitAddon.fit();

      // Write a welcome message with rectangle border
      const welcomeBox = [
        '      \x1b[38;5;173m╔══════════════════════════════════════════════════╗\x1b[0m',
        '      \x1b[38;5;173m║\x1b[0m                                                  \x1b[38;5;173m║\x1b[0m',
        '      \x1b[38;5;173m║\x1b[0m              \x1b[1m\x1b[38;5;223mWELCOME TO INTELLIPROMPT\x1b[0m            \x1b[38;5;173m║\x1b[0m',
        '      \x1b[38;5;173m║\x1b[0m                                                  \x1b[38;5;173m║\x1b[0m',
        '      \x1b[38;5;173m╚══════════════════════════════════════════════════╝\x1b[0m',
        ''
      ];
      
      welcomeBox.forEach(line => {
        term.write(`${line}\r\n`);
      });
      
      term.write('\r\n');
      
      // Write 3D ASCII art for "Intelli Prompt"
      const asciiArt = [
        '      ██╗███╗   ██╗████████╗███████╗██╗     ██╗     ██╗',
        '      ██║████╗  ██║╚══██╔══╝██╔════╝██║     ██║     ██║',
        '      ██║██╔██╗ ██║   ██║   █████╗  ██║     ██║     ██║',
        '      ██║██║╚██╗██║   ██║   ██╔══╝  ██║     ██║     ██║',
        '      ██║██║ ╚████║   ██║   ███████╗███████╗███████╗██║',
        '      ╚═╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚══════╝╚══════╝╚═╝',
        '                                                       ',
        '      ██████╗ ██████╗  ██████╗ ███╗   ███╗██████╗ ████████╗',
        '      ██╔══██╗██╔══██╗██╔═══██╗████╗ ████║██╔══██╗╚══██╔══╝',
        '      ██████╔╝██████╔╝██║   ██║██╔████╔██║██████╔╝   ██║   ',
        '      ██╔═══╝ ██╔══██╗██║   ██║██║╚██╔╝██║██╔═══╝    ██║   ',
        '      ██║     ██║  ██║╚██████╔╝██║ ╚═╝ ██║██║        ██║   ',
        '      ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝╚═╝        ╚═╝   ',
        ''
      ];
      
      asciiArt.forEach(line => {
        term.write(`\x1b[38;5;173m${line}\x1b[0m\r\n`); // Custom color #da7857 for the ASCII art
      });
      
      term.write('  \x1b[38;5;223mPress Enter To Continue:\x1b[0m\r\n\r\n'); // Peach instruction text
      
      // When the user types something in xterm.js, send it to the Main process
      term.onData((data) => window.api.sendToPty(data));

      // When we get data back from the Main process, write it to xterm.js
      const unsubscribe = window.api.receiveFromPty((data) => term.write(data));

      // This is a cleanup function that runs when the component is unmounted
      return () => {
        unsubscribe(); // Clean up the subscription
        term.dispose(); // Important to prevent memory leaks
      };
    }
  }, []); // The empty array means this effect runs only once

  return (
    // The ref is attached to this div, so xterm knows where to render
    <div ref={termRef} style={{ width: '100%', height: '100%' }} />
  );
}

export default TerminalPane;