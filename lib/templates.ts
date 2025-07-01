import { Canvas } from "./canvas-store";

const templates: Canvas[] = [
  {
    id: "1751393359241-vmvf4f9pa",
    name: "Simple proofread",
    nodes: [
      {
        id: "1",
        data: {
          prompt:
            'Hey, thanks for the offer! I appreciate it, and glad you liked the laptop.€1150 is a bit lower then I was hoping for, given the market value of the components and the excellent condition. Could you meat me at €1250? I think thats a fare price for a system of this caliber."',
          label: "text",
          dirty: false,
          loading: false,
          output:
            'Hey, thanks for the offer! I appreciate it, and glad you liked the laptop.€1150 is a bit lower then I was hoping for, given the market value of the components and the excellent condition. Could you meat me at €1250? I think thats a fare price for a system of this caliber."',
        },
        position: {
          x: -36.242683728129066,
          y: 14.497073491251655,
        },
        width: 500,
        height: 200,
        type: "prompt",
        measured: {
          width: 500,
          height: 200,
        },
        selected: false,
        dragging: false,
      },
      {
        id: "2",
        data: {
          systemPrompt:
            "Proofread this text, fix any english mistakes. \nReplace words for a formal tone.\nOnly respond with the raw improved text.",
          modelId: "gemini-2.5-flash",
          loading: false,
          output:
            "Thank you for your offer. I appreciate your interest and am pleased that you are satisfied with the laptop. However, €1150 is somewhat lower than I was anticipating, considering the market value of its components and its excellent condition. Would you be willing to meet me at €1250? I believe that would be a fair price for a system of this caliber.",
        },
        position: {
          x: 92.46384493130867,
          y: 277.31630885299467,
        },
        width: 383,
        height: 272,
        type: "ai",
        measured: {
          width: 383,
          height: 272,
        },
        selected: false,
        dragging: false,
        resizing: false,
      },
      {
        id: "3",
        data: {
          text: "Thank you for your offer. I appreciate your interest and am pleased that you are satisfied with the laptop. However, €1150 is somewhat lower than I was anticipating, considering the market value of its components and its excellent condition. Would you be willing to meet me at €1250? I believe that would be a fair price for a system of this caliber.",
          loading: false,
          output:
            "Thank you for your offer. I appreciate your interest and am pleased that you are satisfied with the laptop. However, €1150 is somewhat lower than I was anticipating, considering the market value of its components and its excellent condition. Would you be willing to meet me at €1250? I believe that would be a fair price for a system of this caliber.",
        },
        position: {
          x: 32.61841535531619,
          y: 627.7860575248992,
        },
        width: 739,
        height: 356,
        type: "markdown",
        measured: {
          width: 739,
          height: 356,
        },
        selected: false,
        resizing: false,
        dragging: false,
      },
    ],
    edges: [
      {
        id: "1-2",
        source: "1",
        target: "2",
        type: "default",
        animated: false,
      },
      {
        id: "2-3",
        source: "2",
        target: "3",
        type: "default",
        animated: false,
      },
    ],
    createdAt: "2025-07-01T18:09:19.241Z",
    updatedAt: "2025-07-01T18:20:13.203Z",
  },
  {
    id: "1751394123995-ip1wqog5q",
    name: "Advanced proofread",
    nodes: [
      {
        id: "1",
        data: {
          prompt:
            'Hey, thanks for the offer! I appreciate it, and glad you liked the laptop.€1150 is a bit lower then I was hoping for, given the market value of the components and the excellent condition. Could you meat me at €1250? I think thats a fare price for a system of this caliber."',
          label: "text",
          dirty: false,
          loading: false,
          output:
            'Hey, thanks for the offer! I appreciate it, and glad you liked the laptop.€1150 is a bit lower then I was hoping for, given the market value of the components and the excellent condition. Could you meat me at €1250? I think thats a fare price for a system of this caliber."',
        },
        position: {
          x: -361.88011158341106,
          y: -43.44465976349076,
        },
        width: 500,
        height: 200,
        type: "prompt",
        measured: {
          width: 500,
          height: 200,
        },
        selected: false,
        dragging: false,
      },
      {
        id: "2",
        data: {
          systemPrompt:
            "Proofread this text, fix any english mistakes. \nAlso Improve the text, adapt your tone and wording based on the context.\n\nGenerate 5 different versions with various direction, like concice, shorter, formal, casual, etc. be creative.\n\nOutput only the raw text of each versions separated with `\\n\\n---\\n\\n`.",
          modelId: "gemini-2.5-flash",
          loading: false,
          output:
            "Thanks for your offer! I'm glad you like the laptop. While I appreciate the €1150, it's a bit below what I'm looking for, considering its excellent condition and component value. Would you be able to meet me at €1250? I believe that's a fair price for this caliber of system.\n\n---\n\nThank you for your offer; I truly appreciate your interest and am pleased you like the laptop. Regarding the €1150, it's somewhat lower than my expectation, especially given the current market value of its high-quality components and the device's pristine condition. Would you consider meeting at €1250? I feel this represents a more equitable price for a system of this performance and quality.\n\n---\n\nHey, thanks so much for the offer! Really glad you're keen on the laptop. €1150 is a bit less than I was hoping for, especially since it's in such great shape and has solid components. How about we meet in the middle at €1250? I think that's a really fair deal for such a good machine!\n\n---\n\nI appreciate your offer and am pleased you recognize the laptop's quality. However, €1150 is quite a bit lower than its true market value, considering the premium components and its immaculate condition. My asking price reflects its caliber. I'm firm on €1250, which I believe is a very reasonable price for this high-performance system.\n\n---\n\nThanks for the offer, glad you like it. €1150 is too low given components/condition. Can we do €1250? That's fair for this laptop.",
          dirty: false,
        },
        position: {
          x: -63.052290706649416,
          y: 232.47971150884564,
        },
        width: 460,
        height: 373,
        type: "ai",
        measured: {
          width: 460,
          height: 373,
        },
        selected: true,
        resizing: false,
        dragging: false,
      },
      {
        data: {
          prompt: "this is a response for a Vinted listing to sell a laptop",
          label: "context",
          dirty: false,
          loading: false,
          output: "this is a response for a Vinted listing to sell a laptop",
        },
        position: {
          x: 504.2231776911635,
          y: -59.5378260243251,
        },
        type: "prompt",
        id: "1751394367426-80tty78ra",
        measured: {
          width: 393,
          height: 194,
        },
        selected: false,
        dragging: false,
        width: 393,
        height: 194,
        resizing: false,
      },
      {
        data: {
          loading: false,
          output:
            "Thanks for your offer! I'm glad you like the laptop. While I appreciate the €1150, it's a bit below what I'm looking for, considering its excellent condition and component value. Would you be able to meet me at €1250? I believe that's a fair price for this caliber of system.\n\n---\n\nThank you for your offer; I truly appreciate your interest and am pleased you like the laptop. Regarding the €1150, it's somewhat lower than my expectation, especially given the current market value of its high-quality components and the device's pristine condition. Would you consider meeting at €1250? I feel this represents a more equitable price for a system of this performance and quality.\n\n---\n\nHey, thanks so much for the offer! Really glad you're keen on the laptop. €1150 is a bit less than I was hoping for, especially since it's in such great shape and has solid components. How about we meet in the middle at €1250? I think that's a really fair deal for such a good machine!\n\n---\n\nI appreciate your offer and am pleased you recognize the laptop's quality. However, €1150 is quite a bit lower than its true market value, considering the premium components and its immaculate condition. My asking price reflects its caliber. I'm firm on €1250, which I believe is a very reasonable price for this high-performance system.\n\n---\n\nThanks for the offer, glad you like it. €1150 is too low given components/condition. Can we do €1250? That's fair for this laptop.",
          text: "Thanks for your offer! I'm glad you like the laptop. While I appreciate the €1150, it's a bit below what I'm looking for, considering its excellent condition and component value. Would you be able to meet me at €1250? I believe that's a fair price for this caliber of system.\n\n---\n\nThank you for your offer; I truly appreciate your interest and am pleased you like the laptop. Regarding the €1150, it's somewhat lower than my expectation, especially given the current market value of its high-quality components and the device's pristine condition. Would you consider meeting at €1250? I feel this represents a more equitable price for a system of this performance and quality.\n\n---\n\nHey, thanks so much for the offer! Really glad you're keen on the laptop. €1150 is a bit less than I was hoping for, especially since it's in such great shape and has solid components. How about we meet in the middle at €1250? I think that's a really fair deal for such a good machine!\n\n---\n\nI appreciate your offer and am pleased you recognize the laptop's quality. However, €1150 is quite a bit lower than its true market value, considering the premium components and its immaculate condition. My asking price reflects its caliber. I'm firm on €1250, which I believe is a very reasonable price for this high-performance system.\n\n---\n\nThanks for the offer, glad you like it. €1150 is too low given components/condition. Can we do €1250? That's fair for this laptop.",
          dirty: false,
        },
        position: {
          x: 11.302028858417998,
          y: 714.2871198744728,
        },
        height: 600,
        width: 600,
        type: "markdown",
        id: "1751394991912-bq0z92zzg",
        measured: {
          width: 600,
          height: 600,
        },
        selected: false,
        dragging: false,
      },
      {
        data: {
          systemPrompt:
            "Which of these versions is the best based on the context ?\n\njust respond with the raw text of the best version.",
          loading: false,
          modelId: "gemini-2.5-flash",
          output:
            "Hey, thanks so much for the offer! Really glad you're keen on the laptop. €1150 is a bit less than I was hoping for, especially since it's in such great shape and has solid components. How about we meet in the middle at €1250? I think that's a really fair deal for such a good machine!",
          dirty: false,
        },
        position: {
          x: 439.9882881560062,
          y: 1437.5461371530457,
        },
        height: 247,
        width: 517,
        zIndex: 1,
        type: "ai",
        id: "1751395085173-6r7s0a667",
        measured: {
          width: 517,
          height: 247,
        },
        selected: false,
        dragging: false,
        resizing: false,
      },
      {
        data: {
          loading: false,
          output:
            "Hey, thanks so much for the offer! Really glad you're keen on the laptop. €1150 is a bit less than I was hoping for, especially since it's in such great shape and has solid components. How about we meet in the middle at €1250? I think that's a really fair deal for such a good machine!",
          text: "Hey, thanks so much for the offer! Really glad you're keen on the laptop. €1150 is a bit less than I was hoping for, especially since it's in such great shape and has solid components. How about we meet in the middle at €1250? I think that's a really fair deal for such a good machine!",
          dirty: false,
        },
        position: {
          x: 187.19877012781967,
          y: 1785.1786129546153,
        },
        height: 321,
        width: 678,
        type: "markdown",
        id: "1751395188829-ywaes2v74",
        measured: {
          width: 678,
          height: 321,
        },
        selected: false,
        dragging: false,
        resizing: false,
      },
    ],
    edges: [
      {
        id: "1-2",
        source: "1",
        target: "2",
        type: "default",
        animated: false,
      },
      {
        source: "1751394367426-80tty78ra",
        target: "2",
        id: "xy-edge__1751394367426-80tty78ra-2",
        animated: false,
      },
      {
        source: "2",
        target: "1751394991912-bq0z92zzg",
        id: "xy-edge__2-1751394991912-bq0z92zzg",
        animated: false,
      },
      {
        source: "1751394991912-bq0z92zzg",
        target: "1751395085173-6r7s0a667",
        id: "xy-edge__1751394991912-bq0z92zzg-1751395085173-6r7s0a667",
        animated: false,
      },
      {
        source: "1751394367426-80tty78ra",
        target: "1751395085173-6r7s0a667",
        id: "xy-edge__1751394367426-80tty78ra-1751395085173-6r7s0a667",
        animated: false,
      },
      {
        source: "1751395085173-6r7s0a667",
        target: "1751395188829-ywaes2v74",
        id: "xy-edge__1751395085173-6r7s0a667-1751395188829-ywaes2v74",
        animated: false,
      },
    ],
    updatedAt: "2025-07-01T20:49:30.373Z",
    createdAt: "2025-07-01T18:09:19.241Z",
  },
];
