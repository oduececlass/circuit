/* Study links use Circuit Studio's existing #problem=family/topic/example routes. */
window.CIRCUIT_STUDIES = [
  {
    id: 'follow-current', number: '01', family: 'Op amp', time: '10–15 min',
    title: 'Follow the current',
    description: 'Connect virtual ground, current flow, and negative feedback in an inverting amplifier.',
    route: 'opamp/inverting/start', tools: ['X-ray', 'KCL · KVL'],
    predict: 'With a 0.5 V input, R₁ = 10 kΩ and Rf = 40 kΩ, what sign and magnitude should the output have?',
    explore: ['Turn on X-ray. Hover the input and feedback resistors to compare their currents.', 'Use KCL · KVL to inspect the inverting-input node. Explain why almost no current enters the ideal op amp.', 'Change Rf from 40 kΩ to 80 kΩ. Predict the new output before checking the solution.'],
    explain: 'Why is virtual ground at approximately 0 V even though it is not wired to ground?',
    check: 'In the ideal linear region, gain = −Rf/R₁ = −4 and output = −2 V. Both resistor currents have magnitude 50 μA. With Rf = 80 kΩ, the output becomes −4 V if the output limits permit it.',
    actions: [{ label: 'Show X-ray', lens: 'xray' }, { label: 'Explore KCL · KVL', lens: 'kirchhoff' }]
  },
  {
    id: 'diode-bias', number: '02', family: 'Diode', time: '10–15 min',
    title: 'Find the operating point',
    description: 'See where a diode’s nonlinear I–V curve meets the resistor load line.',
    route: 'diode/shockley/start', tools: ['Q-Point', 'What-If'],
    predict: 'If the supply stays at 5 V and the 4.7 kΩ series resistance increases, how will diode current change?',
    explore: ['Open Q-Point and identify the device curve, load line, and their intersection.', 'Open What-If, select R, and increase its value. Return to Q-Point to compare the new operating point.', 'Restore the original resistance. Use Silicon to connect the solved bias to the qualitative device picture.'],
    explain: 'Why should the diode voltage be solved from the selected model rather than always assumed to be exactly 0.7 V?',
    check: 'The current decreases as series resistance increases. The new operating point must satisfy both the diode law and I = (5 V − VD)/R. The exponential-model forward voltage changes with current.',
    actions: [{ label: 'Show Q-Point', lens: 'loadline' }, { label: 'Open What-If', lens: 'whatif' }, { label: 'Inside the diode', lens: 'silicon' }]
  },
  {
    id: 'mosfet-regions', number: '03', family: 'MOSFET', time: '10–15 min',
    title: 'Recognize the region',
    description: 'Relate terminal voltages to cutoff, triode, and saturation in an NMOS device.',
    route: 'mosfet/regions/start', tools: ['Silicon', 'Q-Point'],
    predict: 'For VGS = 3 V and VT = 1 V, where is the boundary between triode and saturation?',
    explore: ['Open Silicon and compare the channel picture with the stated operating region.', 'Keep the gate at 3 V. Compare drain voltages of 0.5 V and 3 V using the circuit’s value controls.', 'Lower the gate to 0.8 V. Recheck the region and current; restore the starting values afterward.'],
    explain: 'Why does MOSFET saturation describe the usual amplification region, while BJT saturation does not?',
    check: 'The boundary is VDS = VGS − VT = 2 V. With VGS = 3 V, 0.5 V at the drain gives triode and 3 V gives saturation. VGS = 0.8 V is below the 1 V threshold in this model. The Silicon picture is qualitative.',
    actions: [{ label: 'Inside the MOSFET', lens: 'silicon' }, { label: 'Show Q-Point', lens: 'loadline' }]
  },
  {
    id: 'bjt-divider', number: '04', family: 'BJT', time: '15–20 min',
    title: 'Account for base loading',
    description: 'Fold a bias divider into its Thevenin equivalent and keep the base current.',
    route: 'bjt/divider/start', tools: ['Thevenin', 'What-If'],
    predict: 'A 15 V supply feeds a 100 kΩ / 50 kΩ divider. Will the connected transistor’s base stay at the unloaded divider voltage?',
    explore: ['Open Thevenin and move through all six steps, from identifying the divider to reconnecting the load.', 'Record VTH and RTH. Compare the unloaded divider voltage with the actual base voltage.', 'Inspect the base, collector, and emitter currents in Solution. Change a resistor in What-If and explain the new bias.'],
    explain: 'Where does the missing base voltage go when the transistor loads the divider?',
    check: 'VTH = 5 V and RTH = 100 kΩ ∥ 50 kΩ ≈ 33.3 kΩ. For positive base current, VB = VTH − IB RTH, so the loaded base voltage is below 5 V. Verify forward-active operation before using IC ≈ βIB.',
    actions: [{ label: 'Fold the divider', lens: 'thevenin' }, { label: 'Open What-If', lens: 'whatif' }]
  },
  {
    id: 'small-signal', number: '05', family: 'MOSFET', time: '15–20 min',
    title: 'From DC bias to AC gain',
    description: 'Keep the connections meaningful while constructing a common-source small-signal model.',
    route: 'mosfet/cs/start', tools: ['DC ↔ AC', 'Simulation'],
    predict: 'What happens to a constant DC supply and a large coupling capacitor in a midband small-signal model?',
    explore: ['Open DC ↔ AC. Move through the conversion steps and track the same transistor terminals.', 'Compare the original, DC, and small-signal circuit views. Check the bias region before interpreting gm.', 'Open Simulation, run the circuit, and compare the input and output traces. Begin with the supplied small input signal.'],
    explain: 'Why must the DC operating point be found before the incremental gain can be calculated?',
    check: 'An independent DC voltage source becomes a short for incremental AC changes. Coupling and bypass capacitors are approximated as shorts at midband, while they are open in the steady DC model. A conducting common-source stage gives an inverted output. Use Simulation for measured traces; the Waves visual aid is an illustrative sketch.',
    actions: [{ label: 'Step through DC ↔ AC', lens: 'morph' }, { label: 'Open Simulation', command: 'simulation' }]
  },
  {
    id: 'breadboard', number: '06', family: 'Build', time: '15–25 min',
    title: 'Build, check, and compare',
    description: 'Turn a simple diode circuit into a breadboard build and check its connections.',
    route: 'diode/series/start', tools: ['Breadboard', 'Compare'],
    predict: 'With a 5 V supply, a 1 kΩ resistor and a 0.7 V diode model, what current should the series circuit carry?',
    explore: ['Open Breadboard. Use the guided build to place the source, series resistor, diode, and ground connections.', 'Check diode orientation and the breadboard’s connected hole groups. Use Check after wiring.', 'Open Compare to view your build beside the completed reference. Correct connection errors, then test again.'],
    explain: 'Which breadboard holes represent the same electrical node, and which holes only appear close together?',
    check: 'For the selected constant-drop model, I = (5 − 0.7)/1000 = 4.3 mA. A matching drawing is not enough: the supply return, diode polarity, and electrically common hole groups must be connected correctly.',
    actions: [{ label: 'Open Breadboard', command: 'breadboard' }, { label: 'Compare with reference', command: 'compare' }]
  }
];
