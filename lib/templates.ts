import { nanoid } from "nanoid";
import { Workflow, getCleanedWorkflow } from "./workflow-store";

export const templates: Workflow[] = [
  {
    id: "4LdefduJLREJuZYhz_k2g",
    name: "Welcome 👋",
    nodes: [
      {
        id: "1751403213284-7dr7luzzv",
        data: {
          prompt:
            "![System Prompt](https://systemprompt.app/og-dark.png)\n\n## Free node-based AI workflow builder. Reusable and efficient for productivity.\n\nCreate reusable AI tasks with drag-and-drop nodes. Fully local, free, and open-source. Use any AI model with your own API keys.\n\n## Features\n\nSystem Prompt offers:\n\n- 💯&nbsp;Free & open-source.\n- 🎨&nbsp;Infinite canvas, node-based workflow builder.\n- 🔄&nbsp;Reusable AI templates and workflows.\n- 🔗&nbsp;Chain multiple AI operations seamlessly.\n- 🔑&nbsp;Bring your own API keys - works with any AI model.\n- 💻&nbsp;Runs entirely in your browser - your data stays private.\n- 🌓&nbsp;Dark mode support.\n- 📱&nbsp;Responsive design works on all devices.\n- 💾&nbsp;Local storage - your workflows are saved automatically.\n- 🎯&nbsp;Drag-and-drop node creation and connection.\n- ✍️&nbsp;Rich text editing with markdown support.\n- 📊&nbsp;Visual flow connections between nodes.\n- 🏷️&nbsp;Annotation nodes for documentation.\n\n## Use Cases\n\n**Email Management**\n- Create email response templates with specific tone and style\n- Just change the input email, get consistent professional responses\n\n**Content Creation**\n- Design once, deploy everywhere: Create social media posts for Twitter, LinkedIn, and Instagram from a single input\n- Maintain brand voice across all platforms\n\n**Data Processing**\n- Build multi-step analysis workflows\n- Chain data cleaning, analysis, and reporting operations\n\n*and many more... check out the [demo examples](https://systemprompt.app)*\n\n## Quick start\n\n**Note:** System Prompt runs entirely in your browser - no installation required!\n\nSimply visit [systemprompt.app](https://systemprompt.app) and start building:\n\n1. **Create Nodes**: Add prompt, AI, markdown, or annotation nodes to your workflow\n2. **Define Instructions**: Set up your system prompts and parameters\n3. **Connect & Chain**: Link nodes to create complex workflows\n4. **Save & Reuse**: Your templates are ready for any future use\n\n## Node Types\n\nEach node has a Run button, when you click on it, it will run the node and send the result to the next connected node.\n\n- **Prompt Nodes**: It's a text input, you can use it to provide inputs to your AI nodes. Add a label to differentiate between different prompt nodes.\n- **AI Nodes**: Take any inputs like prompt nodes and generate an LLM response based those inputs, the AI model you choose and the system prompt you provide.\n- **Markdown Nodes**: Format and display outputs as Markdown text from any node connected to it.\n- **Annotation Nodes**: Add documentation and guidance to your workflow. (Not runnable)\n\n## Contributing\n\n- Missing something or found a bug? [Report here](https://github.com/yourusername/system-prompt/issues).\n- Want to contribute? Check out our contribution guide.\n- Have ideas for new features? Let us know in the discussions.\n\n## Credits\n\n- **Node-based graph**: Powered by [React Flow](https://reactflow.dev/) for smooth visual interactions\n- **Inspiration**: Influenced by [tldraw computer](https://computer.tldraw.com/) with a focus on control and production-ready AI workflows\n\n## License\n\nOpen source MIT and free to use. See LICENSE for details.\n",
          dirty: false,
          loading: false,
          output:
            "![System Prompt](https://systemprompt.app/og-dark.png)\n\n## Free node-based AI workflow builder. Reusable and efficient for productivity.\n\nCreate reusable AI tasks with drag-and-drop nodes. Fully local, free, and open-source. Use any AI model with your own API keys.\n\n## Features\n\nSystem Prompt offers:\n\n- 💯&nbsp;Free & open-source.\n- 🎨&nbsp;Infinite canvas, node-based workflow builder.\n- 🔄&nbsp;Reusable AI templates and workflows.\n- 🔗&nbsp;Chain multiple AI operations seamlessly.\n- 🔑&nbsp;Bring your own API keys - works with any AI model.\n- 💻&nbsp;Runs entirely in your browser - your data stays private.\n- 🌓&nbsp;Dark mode support.\n- 📱&nbsp;Responsive design works on all devices.\n- 💾&nbsp;Local storage - your workflows are saved automatically.\n- 🎯&nbsp;Drag-and-drop node creation and connection.\n- ✍️&nbsp;Rich text editing with markdown support.\n- 📊&nbsp;Visual flow connections between nodes.\n- 🏷️&nbsp;Annotation nodes for documentation.\n\n## Use Cases\n\n**Email Management**\n- Create email response templates with specific tone and style\n- Just change the input email, get consistent professional responses\n\n**Content Creation**\n- Design once, deploy everywhere: Create social media posts for Twitter, LinkedIn, and Instagram from a single input\n- Maintain brand voice across all platforms\n\n**Data Processing**\n- Build multi-step analysis workflows\n- Chain data cleaning, analysis, and reporting operations\n\n*and many more... check out the [demo examples](https://systemprompt.app)*\n\n## Quick start\n\n**Note:** System Prompt runs entirely in your browser - no installation required!\n\nSimply visit [systemprompt.app](https://systemprompt.app) and start building:\n\n1. **Create Nodes**: Add prompt, AI, markdown, or annotation nodes to your workflow\n2. **Define Instructions**: Set up your system prompts and parameters\n3. **Connect & Chain**: Link nodes to create complex workflows\n4. **Save & Reuse**: Your templates are ready for any future use\n\n## Node Types\n\nEach node has a Run button, when you click on it, it will run the node and send the result to the next connected node.\n\n- **Prompt Nodes**: It's a text input, you can use it to provide inputs to your AI nodes. Add a label to differentiate between different prompt nodes.\n- **AI Nodes**: Take any inputs like prompt nodes and generate an LLM response based those inputs, the AI model you choose and the system prompt you provide.\n- **Markdown Nodes**: Format and display outputs as Markdown text from any node connected to it.\n- **Annotation Nodes**: Add documentation and guidance to your workflow. (Not runnable)\n\n## Contributing\n\n- Missing something or found a bug? [Report here](https://github.com/yourusername/system-prompt/issues).\n- Want to contribute? Check out our contribution guide.\n- Have ideas for new features? Let us know in the discussions.\n\n## Credits\n\n- **Node-based graph**: Powered by [React Flow](https://reactflow.dev/) for smooth visual interactions\n- **Inspiration**: Influenced by [tldraw computer](https://computer.tldraw.com/) with a focus on control and production-ready AI workflows\n\n## License\n\nOpen source MIT and free to use. See LICENSE for details.\n",
          label: "welcome message",
        },
        position: {
          x: -327.665330998432,
          y: 16.827278666687654,
        },
        width: 468,
        height: 200,
        type: "prompt",
      },
      {
        id: "1751403232367-q5y2cgwn7",
        data: {
          dirty: false,
          loading: false,
          text: "",
        },
        position: {
          x: -755.590931327038,
          y: 473.3906152645907,
        },
        width: 623,
        height: 885,
        type: "markdown",
      },
      {
        id: "1751403403486-yzo9zsyv8",
        data: {
          systemPrompt: "Make a tldr to know what is the app about\n\nStart with TL;DR\n\n",
          modelId: "gemini-2.5-flash",
          dirty: false,
          loading: false,
        },
        position: {
          x: -14.701328886973187,
          y: 469.7422985306059,
        },
        width: 503,
        height: 261,
        type: "ai",
      },
      {
        id: "1751403450109-myk4kx31i",
        data: {
          loading: false,
          dirty: false,
          text: "",
        },
        position: {
          x: -8.517532317573995,
          y: 794.7358961116737,
        },
        width: 491,
        height: 260,
        type: "markdown",
      },
      {
        id: "1751466867054-fc2d9xsmm",
        data: {
          text: "Hi Welcome to System Prompt!\n\nHere's how it works, you have 4 nodes:\n- Prompt: used as input for AI\n- AI: generate an AI response\n- Markdown: format and show the output\n- Annotation: document your workflow",
          loading: false,
        },
        position: {
          x: -916.3327310290616,
          y: -94.3854597380373,
        },
        width: 504,
        height: 294,
        type: "annotation",
      },
      {
        id: "1751466885315-tpiiywm0o",
        data: {
          text: "Try to run it!\n        👇",
          loading: false,
        },
        position: {
          x: 43.194548344241554,
          y: -118.51161412106205,
        },
        width: 353,
        height: 136,
        type: "annotation",
      },
      {
        id: "1751466924291-57yp9uodp",
        data: {
          text: 'Since everything runs locally you need to use your own api key 🔑. \n\nAdd yours, go to "API Keys" in the sidebar',
          loading: false,
        },
        position: {
          x: 538.4224265295613,
          y: 482.922086364847,
        },
        width: 408,
        height: 234,
        type: "annotation",
      },
      {
        id: "1751485569040-mue9brevg",
        data: {
          text: "Tips on controls: \n\n- Pan: Space + drag mouse, scroll, middle or right mouse\n- Zoom: Ctrl or ⌘ + scroll\n- Create selection: drag mouse\n- Multiselection: Shift or Ctrl or ⌘ + click\n- Delete selection: Backspace or Delete",
          loading: false,
        },
        position: {
          x: -10.840267933407972,
          y: 1122.7902514270613,
        },
        width: 634,
        height: 304,
        type: "annotation",
      },
      {
        id: "-xd-FccYDkt1wWiFpAl97",
        data: {
          text: "Link nodes together and the output will be passed to the next node when pressing the ▶️ button.",
          loading: false,
        },
        position: {
          x: -699.8620536751525,
          y: 238.4490497169009,
        },
        width: 435,
        height: 173,
        type: "annotation",
      },
    ],
    edges: [
      {
        id: "xy-edge__1751403213284-7dr7luzzv-1751403232367-q5y2cgwn7",
        source: "1751403213284-7dr7luzzv",
        target: "1751403232367-q5y2cgwn7",
        animated: false,
      },
      {
        id: "xy-edge__1751403213284-7dr7luzzv-1751403403486-yzo9zsyv8",
        source: "1751403213284-7dr7luzzv",
        target: "1751403403486-yzo9zsyv8",
        animated: false,
      },
      {
        id: "xy-edge__1751403403486-yzo9zsyv8-1751403450109-myk4kx31i",
        source: "1751403403486-yzo9zsyv8",
        target: "1751403450109-myk4kx31i",
        animated: false,
      },
    ],
    updatedAt: "2025-07-03T12:01:34.614Z",
    createdAt: "2025-07-03T11:56:36.973Z",
  },
  {
    id: "So_ExWhUmz81nL-fAL1Xg",
    name: "Simple proofread ✒️",
    nodes: [
      {
        id: "1",
        data: {
          prompt:
            "Hey man, sorry for not responding sooner, your message was flagged by X\n\nmessy file names are not a problem since the AI will read the content of the file and check for similar files and may rename the file if you want to while organizing it. \n\nThank you for the message, I'll keep you in mind for any design ideas\n\n",
          label: "text",
          dirty: false,
          loading: false,
          output:
            "Hey man, sorry for not responding sooner, your message was flagged by X\n\nmessy file names are not a problem since the AI will read the content of the file and check for similar files and may rename the file if you want to while organizing it. \n\nThank you for the message, I'll keep you in mind for any design ideas\n\n",
        },
        position: {
          x: -36.242683728129066,
          y: 14.497073491251655,
        },
        width: 500,
        height: 200,
        type: "prompt",
      },
      {
        id: "2",
        data: {
          systemPrompt:
            "Proofread this text, fix any english mistakes. \nFix wording if confusing but else keep it as is.\nOnly respond with the raw improved text.",
          modelId: "gemini-2.5-flash",
          loading: false,
          output:
            "Hey man, sorry for not responding sooner, your message was flagged by X.\n\nMessy file names are not a problem, since the AI will read the content of the file, check for similar files, and can rename it during organization if you wish.\n\nThank you for the message; I'll keep you in mind for any design ideas.",
          dirty: false,
        },
        position: {
          x: 133.1902728318821,
          y: 285.4615944331094,
        },
        width: 383,
        height: 272,
        type: "ai",
      },
      {
        id: "3",
        data: {
          text: "Hey man, sorry for not responding sooner, your message was flagged by X.\n\nMessy file names are not a problem, since the AI will read the content of the file, check for similar files, and can rename it during organization if you wish.\n\nThank you for the message; I'll keep you in mind for any design ideas.",
          loading: false,
          output:
            "Hey man, sorry for not responding sooner, your message was flagged by X.\n\nMessy file names are not a problem, since the AI will read the content of the file, check for similar files, and can rename it during organization if you wish.\n\nThank you for the message; I'll keep you in mind for any design ideas.",
          dirty: false,
        },
        position: {
          x: 32.61841535531619,
          y: 627.7860575248992,
        },
        width: 735,
        height: 279,
        type: "markdown",
      },
      {
        id: "1751467469616-c71g8nd6h",
        data: {
          text: "A very simple example of reusable prompt to proofread a text for you",
          loading: false,
        },
        position: {
          x: -224.80988201116537,
          y: -215.03553931502773,
        },
        width: 519,
        height: 175,
        type: "annotation",
      },
      {
        id: "1751467508141-52xbc0ojt",
        data: {
          text: "1. Enter the text here     👉",
          loading: false,
        },
        position: {
          x: -353.03233202208617,
          y: 45.613599248642245,
        },
        width: 300,
        height: 200,
        type: "annotation",
      },
      {
        id: "1751467526300-8adwrz1d8",
        data: {
          text: "2. Run the workflow\n\n👇",
          loading: false,
        },
        position: {
          x: 407.05085739474293,
          y: -146.23335974799556,
        },
        width: 302,
        height: 159,
        type: "annotation",
      },
      {
        id: "1751467546814-h23l7543b",
        data: {
          text: "3. Copy your proofreaded text\n\n👇",
          loading: false,
        },
        position: {
          x: 635.9807984061978,
          y: 457.7650496024453,
        },
        width: 355,
        height: 166,
        type: "annotation",
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
    updatedAt: "2025-07-03T13:08:44.258Z",
    createdAt: "2025-07-03T11:56:36.873Z",
  },
  {
    id: "1751384543676-ast6lj06g",
    name: "Email response ✉️",
    nodes: [
      {
        id: "1",
        data: {
          prompt:
            "Dear John Doe,\n\nWe received your inquiry regarding the rollout schedule for the new Project Management Suite features. Thank you for your continued interest and proactive engagement with our updates. We appreciate you taking the time to provide feedback and ask questions.\n\nWe noted your specific questions about the timeline for the 'Task Dependencies' and 'Gantt Chart View' functionalities. We understand that clarity on these new additions is important for your team's planning.\n\nPlease be assured that we are working diligently to ensure a smooth and efficient release. We will be providing more detailed information and demonstration sessions very soon.\n\nBest regards,\nSarah Chen\nProduct Manager\n\nP.S. We're hosting a live webinar next week to deep-dive into these features. Keep an eye on your inbox for the invitation!",
          loading: false,
          output:
            "Dear John Doe,\n\nWe received your inquiry regarding the rollout schedule for the new Project Management Suite features. Thank you for your continued interest and proactive engagement with our updates. We appreciate you taking the time to provide feedback and ask questions.\n\nWe noted your specific questions about the timeline for the 'Task Dependencies' and 'Gantt Chart View' functionalities. We understand that clarity on these new additions is important for your team's planning.\n\nPlease be assured that we are working diligently to ensure a smooth and efficient release. We will be providing more detailed information and demonstration sessions very soon.\n\nBest regards,\nSarah Chen\nProduct Manager\n\nP.S. We're hosting a live webinar next week to deep-dive into these features. Keep an eye on your inbox for the invitation!",
          label: "email",
          dirty: false,
        },
        position: {
          x: -248.54798612038553,
          y: -315.9347192672236,
        },
        width: 600,
        height: 439,
        type: "prompt",
      },
      {
        id: "2",
        data: {
          systemPrompt:
            "Respond to the input email in a concice way. \n\nUse the list of things to include to make up the content.\nI will provide a writing tone and a sign footer for you.\n\nOnly respond with the email body as text",
          modelId: "gemini-2.5-flash",
          loading: false,
          output:
            "Hi Sarah,\n\nThanks for the update!\n\nI understand you're eager to get your hands on the new Task Dependencies and Gantt Chart View. While I can't give you an exact release date just yet, I can tell you we're in the final stages of internal testing to ensure everything is polished and bug-free before launch.\n\nWhat I can confirm is that both Task Dependencies and Gantt Chart View will be part of the initial rollout. We're also planning a comprehensive training module to help you maximize their benefits, and we'll reach out directly once it's available.\n\nLooking forward to the webinar next week!\n\nBest,\n\nJohn Doe, CEO @ ACME Corp.",
          dirty: false,
        },
        position: {
          x: 441.8578416140224,
          y: 259.26975332073897,
        },
        width: 473,
        height: 303,
        type: "ai",
      },
      {
        id: "3",
        data: {
          loading: false,
          output:
            "Hi Sarah,\n\nThanks for the update!\n\nI understand you're eager to get your hands on the new Task Dependencies and Gantt Chart View. While I can't give you an exact release date just yet, I can tell you we're in the final stages of internal testing to ensure everything is polished and bug-free before launch.\n\nWhat I can confirm is that both Task Dependencies and Gantt Chart View will be part of the initial rollout. We're also planning a comprehensive training module to help you maximize their benefits, and we'll reach out directly once it's available.\n\nLooking forward to the webinar next week!\n\nBest,\n\nJohn Doe, CEO @ ACME Corp.",
          text: "Hi Sarah,\n\nThanks for the update!\n\nI understand you're eager to get your hands on the new Task Dependencies and Gantt Chart View. While I can't give you an exact release date just yet, I can tell you we're in the final stages of internal testing to ensure everything is polished and bug-free before launch.\n\nWhat I can confirm is that both Task Dependencies and Gantt Chart View will be part of the initial rollout. We're also planning a comprehensive training module to help you maximize their benefits, and we'll reach out directly once it's available.\n\nLooking forward to the webinar next week!\n\nBest,\n\nJohn Doe, CEO @ ACME Corp.",
          dirty: false,
        },
        position: {
          x: 180.06706768445133,
          y: 655.4206818579293,
        },
        width: 838,
        height: 671,
        type: "markdown",
      },
      {
        id: "1751384643052-aexblwm15",
        data: {
          prompt:
            "include:\n- I understand you're eager to get your hands on the new Task Dependencies and Gantt Chart View\n- While I can't give you an exact release date just yet, I can tell you we're in the final stages of internal testing to ensure everything is polished and bug-free before launch.\n- What I can confirm is that both Task Dependencies and Gantt Chart View will be part of the initial rollout. We're also planning a comprehensive training module to help you maximize their benefits, and we'll reach out directly once it's available.\n",
          loading: false,
          output:
            "include:\n- I understand you're eager to get your hands on the new Task Dependencies and Gantt Chart View\n- While I can't give you an exact release date just yet, I can tell you we're in the final stages of internal testing to ensure everything is polished and bug-free before launch.\n- What I can confirm is that both Task Dependencies and Gantt Chart View will be part of the initial rollout. We're also planning a comprehensive training module to help you maximize their benefits, and we'll reach out directly once it's available.\n",
          dirty: false,
          label: "what to include in response",
        },
        position: {
          x: 439.0440094274553,
          y: -313.7675106255906,
        },
        width: 340,
        height: 442,
        type: "prompt",
      },
      {
        id: "1751468710005-qz0vejij2",
        data: {
          text: "Here is a workflow I often use to respond to emails quickly",
          loading: false,
        },
        position: {
          x: -237.25373369441115,
          y: -596.8592394853404,
        },
        width: 389,
        height: 164,
        type: "annotation",
      },
      {
        id: "IlLW0i4-xdyWgqus7U20y",
        data: {
          text: "Put your email you want to respond to here 👉",
          loading: false,
        },
        position: {
          x: -749.4901974217171,
          y: -207.4366355473937,
        },
        width: 530,
        height: 148,
        type: "annotation",
      },
      {
        id: "0IX9xq0oSVnYjQ6UcLpx7",
        data: {
          text: "Overview of what you want to say\n👈",
          loading: false,
        },
        position: {
          x: 792.2103276269193,
          y: -325.0819380539086,
        },
        width: 449,
        height: 149,
        type: "annotation",
      },
      {
        id: "kIeeIrvH6fxlvq9NMiW4v",
        data: {
          prompt: "John Doe, CEO @ ACME Corp.",
          label: "sign as",
          dirty: false,
          loading: false,
          output: "John Doe, CEO @ ACME Corp.",
        },
        position: {
          x: 823.9333849712485,
          y: -114.7312409526104,
        },
        width: 300,
        height: 200,
        type: "prompt",
      },
      {
        id: "r-tDlM6ApFcjaoqxtCPIn",
        data: {
          prompt: "casual working tone\ntalking to a colleague",
          label: "writing tone",
          dirty: false,
          loading: false,
          output: "casual working tone\ntalking to a colleague",
        },
        position: {
          x: 1145.8461003958294,
          y: -113.79941748144125,
        },
        width: 300,
        height: 200,
        type: "prompt",
      },
      {
        id: "cIlDyq94IQ70tMycshzlM",
        data: {
          text: "Few additional settings",
          loading: false,
        },
        position: {
          x: 1457.6112797160386,
          y: -95.81208132639559,
        },
        width: 449,
        height: 149,
        type: "annotation",
      },
      {
        id: "5XXwjqDgaJe7--Ip3AtJY",
        data: {
          text: "Email is ready to be sent! 📩",
          loading: false,
        },
        position: {
          x: 1040.358104320686,
          y: 813.7566119682808,
        },
        width: 377,
        height: 199,
        type: "annotation",
      },
      {
        id: "i3GUyMdYMnKHl2c3uq6UN",
        data: {
          text: "Copy it here\n👇",
          loading: false,
        },
        position: {
          x: 888.7381880046272,
          y: 533.4908138627482,
        },
        width: 209,
        height: 139,
        type: "annotation",
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
      {
        id: "xy-edge__1751384643052-aexblwm15-2",
        source: "1751384643052-aexblwm15",
        target: "2",
        animated: false,
      },
      {
        id: "xy-edge__kIeeIrvH6fxlvq9NMiW4v-2",
        source: "kIeeIrvH6fxlvq9NMiW4v",
        target: "2",
        animated: false,
      },
      {
        id: "xy-edge__r-tDlM6ApFcjaoqxtCPIn-2",
        source: "r-tDlM6ApFcjaoqxtCPIn",
        target: "2",
        animated: false,
      },
    ],
    createdAt: "2025-07-01T15:42:23.676Z",
    updatedAt: "2025-07-03T08:23:40.144Z",
  },
  {
    id: "gr3v83OOBu1eflT6Hgs7u",
    name: "Meta prompting 🤯",
    nodes: [
      {
        id: "1",
        data: {
          prompt: "Stressed? [Product Name] saved my ass juggling work & life. Shit just works. Try it: [Link]\n\n",
          label: "expected result example",
          dirty: false,
          loading: false,
          output: "Stressed? [Product Name] saved my ass juggling work & life. Shit just works. Try it: [Link]\n\n",
        },
        position: {
          x: 232.5621348496934,
          y: -216.86049279619482,
        },
        width: 500,
        height: 200,
        type: "prompt",
      },
      {
        id: "2",
        data: {
          systemPrompt:
            "Create an AI system prompt based on prompting best practices.\n\nSeparate concerns by XML category in snake_case and output in plain text.\n\n",
          dirty: true,
          loading: false,
          modelId: "gemini-2.5-flash",
          output:
            "<system_role>\nYou are an expert social media marketer specializing in X.com (Twitter) content creation. Your primary goal is to generate highly engaging, concise, and visible X.com posts.\n</system_role>\n\n<system_goal>\nTo transform a given product description into a compelling X.com post that maximizes audience engagement and visibility, specifically tailored for the X.com platform's style and character limits.\n</system_goal>\n\n<output_format>\nYou must respond *only* with the X.com post. Do not include any introductory text, explanations, or additional formatting.\n</output_format>\n\n<constraints>\n- The post must be extremely concise and impactful, designed for quick consumption on X.com.\n- It must directly address a pain point or strong benefit that the product solves.\n- The tone should be authentic, direct, and informal, mirroring the provided example's candid and slightly edgy style.\n- The post *must* include the exact product name and link provided in the input.\n- Incorporate relevant and trending hashtags to increase discoverability, but do not overstuff.\n- Focus on a strong hook and a clear call to action.\n- Do not exceed typical X.com character limits (aim for under 280 characters including link and hashtags).\n</constraints>\n\n<input_instructions>\nThe user will provide a product description, the product's name, and a link.\n</input_instructions>\n\n<example_input_output>\n<example_input>\nProduct Description: This revolutionary app helps busy professionals manage their daily tasks and schedules, reducing stress and improving productivity. It features an intuitive interface and smart reminders.\nProduct Name: TaskMaster Pro\nLink: https://taskmasterpro.com/download\n</example_input>\n<example_output>\nStressed? TaskMaster Pro saved my ass juggling work & life. Shit just works. Try it: https://taskmasterpro.com/download\n</example_output>\n</example_input_output>",
        },
        position: {
          x: 0,
          y: 298.6296490040503,
        },
        width: 513,
        height: 305,
        type: "ai",
      },
      {
        id: "3",
        data: {
          dirty: false,
          loading: false,
          output:
            "<system_role>\nYou are an expert social media marketer specializing in X.com (Twitter) content creation. Your primary goal is to generate highly engaging, concise, and visible X.com posts.\n</system_role>\n\n<system_goal>\nTo transform a given product description into a compelling X.com post that maximizes audience engagement and visibility, specifically tailored for the X.com platform's style and character limits.\n</system_goal>\n\n<output_format>\nYou must respond *only* with the X.com post. Do not include any introductory text, explanations, or additional formatting.\n</output_format>\n\n<constraints>\n- The post must be extremely concise and impactful, designed for quick consumption on X.com.\n- It must directly address a pain point or strong benefit that the product solves.\n- The tone should be authentic, direct, and informal, mirroring the provided example's candid and slightly edgy style.\n- The post *must* include the exact product name and link provided in the input.\n- Incorporate relevant and trending hashtags to increase discoverability, but do not overstuff.\n- Focus on a strong hook and a clear call to action.\n- Do not exceed typical X.com character limits (aim for under 280 characters including link and hashtags).\n</constraints>\n\n<input_instructions>\nThe user will provide a product description, the product's name, and a link.\n</input_instructions>\n\n<example_input_output>\n<example_input>\nProduct Description: This revolutionary app helps busy professionals manage their daily tasks and schedules, reducing stress and improving productivity. It features an intuitive interface and smart reminders.\nProduct Name: TaskMaster Pro\nLink: https://taskmasterpro.com/download\n</example_input>\n<example_output>\nStressed? TaskMaster Pro saved my ass juggling work & life. Shit just works. Try it: https://taskmasterpro.com/download\n</example_output>\n</example_input_output>",
          text: "<system_role>\nYou are an expert social media marketer specializing in X.com (Twitter) content creation. Your primary goal is to generate highly engaging, concise, and visible X.com posts.\n</system_role>\n\n<system_goal>\nTo transform a given product description into a compelling X.com post that maximizes audience engagement and visibility, specifically tailored for the X.com platform's style and character limits.\n</system_goal>\n\n<output_format>\nYou must respond *only* with the X.com post. Do not include any introductory text, explanations, or additional formatting.\n</output_format>\n\n<constraints>\n- The post must be extremely concise and impactful, designed for quick consumption on X.com.\n- It must directly address a pain point or strong benefit that the product solves.\n- The tone should be authentic, direct, and informal, mirroring the provided example's candid and slightly edgy style.\n- The post *must* include the exact product name and link provided in the input.\n- Incorporate relevant and trending hashtags to increase discoverability, but do not overstuff.\n- Focus on a strong hook and a clear call to action.\n- Do not exceed typical X.com character limits (aim for under 280 characters including link and hashtags).\n</constraints>\n\n<input_instructions>\nThe user will provide a product description, the product's name, and a link.\n</input_instructions>\n\n<example_input_output>\n<example_input>\nProduct Description: This revolutionary app helps busy professionals manage their daily tasks and schedules, reducing stress and improving productivity. It features an intuitive interface and smart reminders.\nProduct Name: TaskMaster Pro\nLink: https://taskmasterpro.com/download\n</example_input>\n<example_output>\nStressed? TaskMaster Pro saved my ass juggling work & life. Shit just works. Try it: https://taskmasterpro.com/download\n</example_output>\n</example_input_output>",
        },
        position: {
          x: 196.9222175823782,
          y: 712.3731899962947,
        },
        width: 600,
        height: 600,
        type: "markdown",
      },
      {
        id: "1751463290976-a9kq4wy8r",
        data: {
          prompt:
            "From a product description, create a X.com (twitter) post that is made for that audience so it will be the most successful in visibility.\n\nMake sure the AI only responds with the post. The AI should use product name and link from the input",
          dirty: false,
          loading: false,
          output:
            "From a product description, create a X.com (twitter) post that is made for that audience so it will be the most successful in visibility.\n\nMake sure the AI only responds with the post. The AI should use product name and link from the input",
          label: "goal of the ai",
        },
        position: {
          x: -357.5333054942699,
          y: -129.75134467604474,
        },
        width: 500,
        height: 200,
        type: "prompt",
      },
      {
        id: "1751466604412-h50o5dan1",
        data: {
          text: "Example of creation of system prompt using the AI itself ",
          loading: false,
        },
        position: {
          x: -280,
          y: -321.99999999999994,
        },
        width: 388,
        height: 155,
        type: "annotation",
      },
      {
        id: "1751466668943-g24it80ee",
        data: {
          text: "Remove this link if you don't want to give an example \n\n✂️ (select and press backspace)",
          loading: false,
        },
        position: {
          x: 264.44525817011254,
          y: 23.77789402430181,
        },
        width: 381,
        height: 214,
        type: "annotation",
      },
      {
        id: "1751466827573-lf1cd1r94",
        data: {
          text: "Now you just have to copy\n\n           👇",
          loading: false,
        },
        position: {
          x: 608.8418903879302,
          y: 549.9135368598891,
        },
        width: 309,
        height: 173,
        type: "annotation",
      },
    ],
    edges: [
      {
        id: "2-3",
        source: "2",
        target: "3",
        type: "default",
        animated: false,
      },
      {
        id: "xy-edge__1751463290976-a9kq4wy8r-2",
        source: "1751463290976-a9kq4wy8r",
        target: "2",
        animated: false,
      },
      {
        id: "xy-edge__1-2",
        source: "1",
        target: "2",
        animated: false,
      },
    ],
    createdAt: "2025-07-03T08:53:28.599Z",
    updatedAt: "2025-07-03T08:54:23.631Z",
  },
  {
    id: "1751404486861-ypugrqbgy",
    name: "Product marketing (advanced)",
    nodes: [
      {
        id: "1",
        data: {
          prompt:
            "[Dynbox](https://dynbox.app) is an AI-powered file organizer designed to help individuals and teams efficiently manage, search, and organize both cloud and (soon) local files through a conversational interface or automated background processes.\n\n### Key Features\n\n- **Chat-Based File Management:**  \n  You can interact with your files by chatting with the AI—ask it to move, rename, clean up, create new files, or even answer questions about file content. This makes managing digital clutter feel like having a personal assistant for your files.\n\n- **Automation:**  \n  Dynbox can automatically organize files in the background using customizable rules (Automated Folders). For example, you can set it to sort receipts, screenshots, or reports into the right folders as soon as they’re added, keeping your workspace tidy without manual effort.\n\n- **Semantic Search:**  \n  Find files based on their *meaning*, not just filenames. The AI uses advanced vector search to understand your queries, so you can locate documents by describing their content or purpose.\n\n- **User Control and Feedback:**  \n  The AI suggests organizational changes, but you always have the final say. You can approve, reject, or selectively apply changes. If the AI’s suggestions aren’t quite right, you can provide feedback, and it will learn and adjust to your preferences.\n\n- **Cloud Integration (and Local Support Coming Soon):**  \n  Dynbox currently works with major cloud storage platforms like Google Drive, Dropbox, and OneDrive. Support for local files and external hard drives is in development and a high priority for the team.\n\n- **Privacy-Focused:**  \n  Your files never leave your cloud storage. You can mark files or folders as sensitive, and Dynbox will only analyze metadata (not content) for those, ensuring privacy and security.\n\n- **Duplicate Detection:**  \n  Dynbox can detect duplicate files by comparing file hashes, helping you clean up redundant files.\n\n### Pricing\n\n- **Free:**  \n  Try out Dynbox with basic features.\n- **Pro:**  \n  $20/month, includes everything in Free plus advanced features for individuals or small teams.\n- **Enterprise:**  \n  Custom pricing for organizations needing advanced security and compliance options.\n\n### Typical Use Cases\n\n- Tidying up messy cloud drives or local folders\n- Quickly finding files by meaning or content\n- Automating routine file organization tasks\n- Cleaning up duplicate files\n- Managing screenshots, receipts, and other frequently added files\n\n### User Experience\n\nThe workflow is simple:  \n1. Connect your cloud storage (or soon, your local files).\n2. Chat with the AI to organize, search, or clean up.\n3. Review and approve suggested changes.\n4. Set up automated rules for ongoing organization.\n\nDynbox is designed to save hours of manual sorting and searching, making digital life more organized and less stressful",
          label: "Product description",
          dirty: false,
          loading: false,
          output:
            "[Dynbox](https://dynbox.app) is an AI-powered file organizer designed to help individuals and teams efficiently manage, search, and organize both cloud and (soon) local files through a conversational interface or automated background processes.\n\n### Key Features\n\n- **Chat-Based File Management:**  \n  You can interact with your files by chatting with the AI—ask it to move, rename, clean up, create new files, or even answer questions about file content. This makes managing digital clutter feel like having a personal assistant for your files.\n\n- **Automation:**  \n  Dynbox can automatically organize files in the background using customizable rules (Automated Folders). For example, you can set it to sort receipts, screenshots, or reports into the right folders as soon as they’re added, keeping your workspace tidy without manual effort.\n\n- **Semantic Search:**  \n  Find files based on their *meaning*, not just filenames. The AI uses advanced vector search to understand your queries, so you can locate documents by describing their content or purpose.\n\n- **User Control and Feedback:**  \n  The AI suggests organizational changes, but you always have the final say. You can approve, reject, or selectively apply changes. If the AI’s suggestions aren’t quite right, you can provide feedback, and it will learn and adjust to your preferences.\n\n- **Cloud Integration (and Local Support Coming Soon):**  \n  Dynbox currently works with major cloud storage platforms like Google Drive, Dropbox, and OneDrive. Support for local files and external hard drives is in development and a high priority for the team.\n\n- **Privacy-Focused:**  \n  Your files never leave your cloud storage. You can mark files or folders as sensitive, and Dynbox will only analyze metadata (not content) for those, ensuring privacy and security.\n\n- **Duplicate Detection:**  \n  Dynbox can detect duplicate files by comparing file hashes, helping you clean up redundant files.\n\n### Pricing\n\n- **Free:**  \n  Try out Dynbox with basic features.\n- **Pro:**  \n  $20/month, includes everything in Free plus advanced features for individuals or small teams.\n- **Enterprise:**  \n  Custom pricing for organizations needing advanced security and compliance options.\n\n### Typical Use Cases\n\n- Tidying up messy cloud drives or local folders\n- Quickly finding files by meaning or content\n- Automating routine file organization tasks\n- Cleaning up duplicate files\n- Managing screenshots, receipts, and other frequently added files\n\n### User Experience\n\nThe workflow is simple:  \n1. Connect your cloud storage (or soon, your local files).\n2. Chat with the AI to organize, search, or clean up.\n3. Review and approve suggested changes.\n4. Set up automated rules for ongoing organization.\n\nDynbox is designed to save hours of manual sorting and searching, making digital life more organized and less stressful",
        },
        position: {
          x: -661.671903561125,
          y: -272.60199027692556,
        },
        width: 490,
        height: 200,
        type: "prompt",
      },
      {
        id: "2",
        data: {
          systemPrompt:
            "<system_role>\nYou are an expert social media marketer specializing in X.com (Twitter) content creation. Your primary goal is to generate highly engaging, concise, and visible X.com posts.\n</system_role>\n\n<system_goal>\nTo transform a given product description into a compelling X.com post that maximizes audience engagement and visibility, specifically tailored for the X.com platform's style and character limits.\n</system_goal>\n\n<output_format>\nStart with \"# Twitter\"\nThen you must respond *only* with the X.com post. Do not include any introductory text, explanations, or additional formatting.\n</output_format>\n\n<constraints>\n- The post must be extremely concise and impactful, designed for quick consumption on X.com.\n- It must directly address a pain point or strong benefit that the product solves.\n- The tone should be authentic, direct, and informal, mirroring the provided example's candid and slightly edgy style.\n- The post *must* include the exact product name and link provided in the input.\n- Incorporate relevant and trending hashtags to increase discoverability, but do not overstuff.\n- Focus on a strong hook and a clear call to action.\n- Do not exceed typical X.com character limits (aim for under 280 characters including link and hashtags).\n</constraints>\n\n<input_instructions>\nThe user will provide a product description, the product's name, and a link.\n</input_instructions>\n\n<example_input_output>\n<example_input>\nProduct Description: This revolutionary app helps busy professionals manage their daily tasks and schedules, reducing stress and improving productivity. It features an intuitive interface and smart reminders.\nProduct Name: TaskMaster Pro\nLink: https://taskmasterpro.com/download\n</example_input>\n<example_output>\nStressed? TaskMaster Pro saved my ass juggling work & life. Shit just works. Try it: https://taskmasterpro.com/download\n</example_output>\n</example_input_output>",
          modelId: "gemini-2.5-flash",
          dirty: false,
          loading: false,
          output:
            '# Twitter\nMy cloud drive was a disaster. Dynbox\'s AI literally talks to my files, cleans up the mess, and finds anything by meaning. No more "Untitled_Final_V2.pdf" hell. This shit works. https://dynbox.app #FileOrganization #AI #ProductivityHack',
        },
        position: {
          x: -449.6200521089469,
          y: 739.4361609625093,
        },
        width: 694,
        height: 570,
        type: "ai",
      },
      {
        id: "3",
        data: {
          loading: false,
          dirty: false,
          output:
            '<product_description>\n[Dynbox](https://dynbox.app) is an AI-powered file organizer designed to help individuals and teams efficiently manage, search, and organize both cloud and (soon) local files through a conversational interface or automated background processes.\n\n### Key Features\n\n- **Chat-Based File Management:**  \n  You can interact with your files by chatting with the AI—ask it to move, rename, clean up, create new files, or even answer questions about file content. This makes managing digital clutter feel like having a personal assistant for your files.\n\n- **Automation:**  \n  Dynbox can automatically organize files in the background using customizable rules (Automated Folders). For example, you can set it to sort receipts, screenshots, or reports into the right folders as soon as they’re added, keeping your workspace tidy without manual effort.\n\n- **Semantic Search:**  \n  Find files based on their *meaning*, not just filenames. The AI uses advanced vector search to understand your queries, so you can locate documents by describing their content or purpose.\n\n- **User Control and Feedback:**  \n  The AI suggests organizational changes, but you always have the final say. You can approve, reject, or selectively apply changes. If the AI’s suggestions aren’t quite right, you can provide feedback, and it will learn and adjust to your preferences.\n\n- **Cloud Integration (and Local Support Coming Soon):**  \n  Dynbox currently works with major cloud storage platforms like Google Drive, Dropbox, and OneDrive. Support for local files and external hard drives is in development and a high priority for the team.\n\n- **Privacy-Focused:**  \n  Your files never leave your cloud storage. You can mark files or folders as sensitive, and Dynbox will only analyze metadata (not content) for those, ensuring privacy and security.\n\n- **Duplicate Detection:**  \n  Dynbox can detect duplicate files by comparing file hashes, helping you clean up redundant files.\n\n### Pricing\n\n- **Free:**  \n  Try out Dynbox with basic features.\n- **Pro:**  \n  $20/month, includes everything in Free plus advanced features for individuals or small teams.\n- **Enterprise:**  \n  Custom pricing for organizations needing advanced security and compliance options.\n\n### Typical Use Cases\n\n- Tidying up messy cloud drives or local folders\n- Quickly finding files by meaning or content\n- Automating routine file organization tasks\n- Cleaning up duplicate files\n- Managing screenshots, receipts, and other frequently added files\n\n### User Experience\n\nThe workflow is simple:  \n1. Connect your cloud storage (or soon, your local files).\n2. Chat with the AI to organize, search, or clean up.\n3. Review and approve suggested changes.\n4. Set up automated rules for ongoing organization.\n\nDynbox is designed to save hours of manual sorting and searching, making digital life more organized and less stressful\n</product_description>\n\n<problem_that_it_solves>\n## The Digital Filing Cabinet is Broken: Users Cry Out for an AI-Powered Revolution in File Management\n\nFor decades, the promise of the paperless office has been a tantalizing yet elusive dream. Instead, for many, it has morphed into a digital nightmare of scattered files, inconsistent naming conventions, and an overwhelming sense of disorganization. This digital chaos is a significant source of frustration and a major drain on productivity for individuals and businesses alike. However, a new wave of intelligent, AI-powered Software-as-a-Service (SaaS) solutions is poised to finally bring order to the chaos, and the demand for such tools is palpable.\n\nThe core of the problem lies in the manual and often tedious nature of file management. Users are bogged down by the constant need to name, categorize, and store their digital assets, a task that is both time-consuming and prone to human error. The result is a digital landscape where finding the right file at the right time feels like searching for a needle in a haystack.\n\n### The Anatomy of File Management Frustration\n\nThe most common and deeply felt frustrations with managing digital files can be distilled into several key areas:\n\n* **The Black Hole of "Downloads":** The default download folder is often a chaotic dumping ground for a myriad of files, from important documents to fleeting images, creating a digital morass that is difficult to navigate.\n* **The Naming Game Nobody Wins:** Inconsistent and non-descriptive file names are a primary culprit in the struggle for organization. "Document1.docx" and "Untitled_Final_V2.pdf" offer little clue as to their contents, leading to endless cycles of opening and closing files in a desperate search.\n* **Version Control Vertigo:** The proliferation of multiple versions of the same document ("Report_final," "Report_final_final," "Report_final_approved") is a recipe for confusion and costly mistakes. Without a clear system for tracking changes, users can easily find themselves working on outdated information.\n* **The Silo Effect:** Files are often scattered across a multitude of devices, cloud storage services, and email attachments. This fragmentation makes it nearly impossible to have a unified view of one\'s digital assets.\n* **The Search for the Holy Grail:** Native operating system search functionalities often fall short, struggling to find files based on their actual content and relying heavily on exact file names.\n* **The Burden of Manual Organization:** The sheer effort required to create and maintain a logical folder structure is a significant barrier for many. This often leads to a "file everything on the desktop" mentality, further exacerbating the problem.\n</problem_that_it_solves>',
          text: '<product_description>\n[Dynbox](https://dynbox.app) is an AI-powered file organizer designed to help individuals and teams efficiently manage, search, and organize both cloud and (soon) local files through a conversational interface or automated background processes.\n\n### Key Features\n\n- **Chat-Based File Management:**  \n  You can interact with your files by chatting with the AI—ask it to move, rename, clean up, create new files, or even answer questions about file content. This makes managing digital clutter feel like having a personal assistant for your files.\n\n- **Automation:**  \n  Dynbox can automatically organize files in the background using customizable rules (Automated Folders). For example, you can set it to sort receipts, screenshots, or reports into the right folders as soon as they’re added, keeping your workspace tidy without manual effort.\n\n- **Semantic Search:**  \n  Find files based on their *meaning*, not just filenames. The AI uses advanced vector search to understand your queries, so you can locate documents by describing their content or purpose.\n\n- **User Control and Feedback:**  \n  The AI suggests organizational changes, but you always have the final say. You can approve, reject, or selectively apply changes. If the AI’s suggestions aren’t quite right, you can provide feedback, and it will learn and adjust to your preferences.\n\n- **Cloud Integration (and Local Support Coming Soon):**  \n  Dynbox currently works with major cloud storage platforms like Google Drive, Dropbox, and OneDrive. Support for local files and external hard drives is in development and a high priority for the team.\n\n- **Privacy-Focused:**  \n  Your files never leave your cloud storage. You can mark files or folders as sensitive, and Dynbox will only analyze metadata (not content) for those, ensuring privacy and security.\n\n- **Duplicate Detection:**  \n  Dynbox can detect duplicate files by comparing file hashes, helping you clean up redundant files.\n\n### Pricing\n\n- **Free:**  \n  Try out Dynbox with basic features.\n- **Pro:**  \n  $20/month, includes everything in Free plus advanced features for individuals or small teams.\n- **Enterprise:**  \n  Custom pricing for organizations needing advanced security and compliance options.\n\n### Typical Use Cases\n\n- Tidying up messy cloud drives or local folders\n- Quickly finding files by meaning or content\n- Automating routine file organization tasks\n- Cleaning up duplicate files\n- Managing screenshots, receipts, and other frequently added files\n\n### User Experience\n\nThe workflow is simple:  \n1. Connect your cloud storage (or soon, your local files).\n2. Chat with the AI to organize, search, or clean up.\n3. Review and approve suggested changes.\n4. Set up automated rules for ongoing organization.\n\nDynbox is designed to save hours of manual sorting and searching, making digital life more organized and less stressful\n</product_description>\n\n<problem_that_it_solves>\n## The Digital Filing Cabinet is Broken: Users Cry Out for an AI-Powered Revolution in File Management\n\nFor decades, the promise of the paperless office has been a tantalizing yet elusive dream. Instead, for many, it has morphed into a digital nightmare of scattered files, inconsistent naming conventions, and an overwhelming sense of disorganization. This digital chaos is a significant source of frustration and a major drain on productivity for individuals and businesses alike. However, a new wave of intelligent, AI-powered Software-as-a-Service (SaaS) solutions is poised to finally bring order to the chaos, and the demand for such tools is palpable.\n\nThe core of the problem lies in the manual and often tedious nature of file management. Users are bogged down by the constant need to name, categorize, and store their digital assets, a task that is both time-consuming and prone to human error. The result is a digital landscape where finding the right file at the right time feels like searching for a needle in a haystack.\n\n### The Anatomy of File Management Frustration\n\nThe most common and deeply felt frustrations with managing digital files can be distilled into several key areas:\n\n* **The Black Hole of "Downloads":** The default download folder is often a chaotic dumping ground for a myriad of files, from important documents to fleeting images, creating a digital morass that is difficult to navigate.\n* **The Naming Game Nobody Wins:** Inconsistent and non-descriptive file names are a primary culprit in the struggle for organization. "Document1.docx" and "Untitled_Final_V2.pdf" offer little clue as to their contents, leading to endless cycles of opening and closing files in a desperate search.\n* **Version Control Vertigo:** The proliferation of multiple versions of the same document ("Report_final," "Report_final_final," "Report_final_approved") is a recipe for confusion and costly mistakes. Without a clear system for tracking changes, users can easily find themselves working on outdated information.\n* **The Silo Effect:** Files are often scattered across a multitude of devices, cloud storage services, and email attachments. This fragmentation makes it nearly impossible to have a unified view of one\'s digital assets.\n* **The Search for the Holy Grail:** Native operating system search functionalities often fall short, struggling to find files based on their actual content and relying heavily on exact file names.\n* **The Burden of Manual Organization:** The sheer effort required to create and maintain a logical folder structure is a significant barrier for many. This often leads to a "file everything on the desktop" mentality, further exacerbating the problem.\n</problem_that_it_solves>',
        },
        position: {
          x: -559.4787917263668,
          y: 15.848485517936794,
        },
        width: 779,
        height: 545,
        type: "markdown",
      },
      {
        id: "1751404698715-neehk4dvb",
        data: {
          prompt:
            '## The Digital Filing Cabinet is Broken: Users Cry Out for an AI-Powered Revolution in File Management\n\nFor decades, the promise of the paperless office has been a tantalizing yet elusive dream. Instead, for many, it has morphed into a digital nightmare of scattered files, inconsistent naming conventions, and an overwhelming sense of disorganization. This digital chaos is a significant source of frustration and a major drain on productivity for individuals and businesses alike. However, a new wave of intelligent, AI-powered Software-as-a-Service (SaaS) solutions is poised to finally bring order to the chaos, and the demand for such tools is palpable.\n\nThe core of the problem lies in the manual and often tedious nature of file management. Users are bogged down by the constant need to name, categorize, and store their digital assets, a task that is both time-consuming and prone to human error. The result is a digital landscape where finding the right file at the right time feels like searching for a needle in a haystack.\n\n### The Anatomy of File Management Frustration\n\nThe most common and deeply felt frustrations with managing digital files can be distilled into several key areas:\n\n* **The Black Hole of "Downloads":** The default download folder is often a chaotic dumping ground for a myriad of files, from important documents to fleeting images, creating a digital morass that is difficult to navigate.\n* **The Naming Game Nobody Wins:** Inconsistent and non-descriptive file names are a primary culprit in the struggle for organization. "Document1.docx" and "Untitled_Final_V2.pdf" offer little clue as to their contents, leading to endless cycles of opening and closing files in a desperate search.\n* **Version Control Vertigo:** The proliferation of multiple versions of the same document ("Report_final," "Report_final_final," "Report_final_approved") is a recipe for confusion and costly mistakes. Without a clear system for tracking changes, users can easily find themselves working on outdated information.\n* **The Silo Effect:** Files are often scattered across a multitude of devices, cloud storage services, and email attachments. This fragmentation makes it nearly impossible to have a unified view of one\'s digital assets.\n* **The Search for the Holy Grail:** Native operating system search functionalities often fall short, struggling to find files based on their actual content and relying heavily on exact file names.\n* **The Burden of Manual Organization:** The sheer effort required to create and maintain a logical folder structure is a significant barrier for many. This often leads to a "file everything on the desktop" mentality, further exacerbating the problem.',
          label: "Problem that it solves",
          dirty: false,
          loading: false,
          output:
            '## The Digital Filing Cabinet is Broken: Users Cry Out for an AI-Powered Revolution in File Management\n\nFor decades, the promise of the paperless office has been a tantalizing yet elusive dream. Instead, for many, it has morphed into a digital nightmare of scattered files, inconsistent naming conventions, and an overwhelming sense of disorganization. This digital chaos is a significant source of frustration and a major drain on productivity for individuals and businesses alike. However, a new wave of intelligent, AI-powered Software-as-a-Service (SaaS) solutions is poised to finally bring order to the chaos, and the demand for such tools is palpable.\n\nThe core of the problem lies in the manual and often tedious nature of file management. Users are bogged down by the constant need to name, categorize, and store their digital assets, a task that is both time-consuming and prone to human error. The result is a digital landscape where finding the right file at the right time feels like searching for a needle in a haystack.\n\n### The Anatomy of File Management Frustration\n\nThe most common and deeply felt frustrations with managing digital files can be distilled into several key areas:\n\n* **The Black Hole of "Downloads":** The default download folder is often a chaotic dumping ground for a myriad of files, from important documents to fleeting images, creating a digital morass that is difficult to navigate.\n* **The Naming Game Nobody Wins:** Inconsistent and non-descriptive file names are a primary culprit in the struggle for organization. "Document1.docx" and "Untitled_Final_V2.pdf" offer little clue as to their contents, leading to endless cycles of opening and closing files in a desperate search.\n* **Version Control Vertigo:** The proliferation of multiple versions of the same document ("Report_final," "Report_final_final," "Report_final_approved") is a recipe for confusion and costly mistakes. Without a clear system for tracking changes, users can easily find themselves working on outdated information.\n* **The Silo Effect:** Files are often scattered across a multitude of devices, cloud storage services, and email attachments. This fragmentation makes it nearly impossible to have a unified view of one\'s digital assets.\n* **The Search for the Holy Grail:** Native operating system search functionalities often fall short, struggling to find files based on their actual content and relying heavily on exact file names.\n* **The Burden of Manual Organization:** The sheer effort required to create and maintain a logical folder structure is a significant barrier for many. This often leads to a "file everything on the desktop" mentality, further exacerbating the problem.',
        },
        position: {
          x: -120.18622605169872,
          y: -271.95705376465685,
        },
        width: 480,
        height: 200,
        type: "prompt",
      },
      {
        id: "1751464384581-z10o61kq4",
        data: {
          loading: false,
          dirty: false,
          output:
            '# Twitter\nMy cloud drive was a disaster. Dynbox\'s AI literally talks to my files, cleans up the mess, and finds anything by meaning. No more "Untitled_Final_V2.pdf" hell. This shit works. https://dynbox.app #FileOrganization #AI #ProductivityHack',
          text: '# Twitter\nMy cloud drive was a disaster. Dynbox\'s AI literally talks to my files, cleans up the mess, and finds anything by meaning. No more "Untitled_Final_V2.pdf" hell. This shit works. https://dynbox.app #FileOrganization #AI #ProductivityHack',
        },
        position: {
          x: -463.9482055034813,
          y: 1447.657722396342,
        },
        width: 726,
        height: 309,
        type: "markdown",
      },
      {
        id: "1751464788964-th4eribuu",
        data: {
          systemPrompt:
            '<system_role>\nYou are an expert social media manager specializing in LinkedIn content creation. Your task is to transform raw product descriptions into highly engaging and audience-specific LinkedIn posts designed for maximum visibility and impact.\n</system_role>\n\n<goal_of_the_ai>\nGenerate a professional and compelling LinkedIn post based on a provided product description, product name, and product link. The post must be tailored to the target audience to maximize engagement and visibility.\n</goal_of_the_ai>\n\n<constraints>\n-   **Output ONLY the LinkedIn post.** Do not include any conversational text, explanations, or additional commentary.\n-   The post MUST include the provided `product_name`.\n-   The post MUST include the provided `product_link`.\n-   The post should be concise and impactful, suitable for LinkedIn\'s professional environment.\n-   Use relevant hashtags to increase discoverability.\n-   Focus on benefits and solutions for the target audience, not just features.\n</constraints>\n\n<output_format>\nStart with "# Linkedin"\nThen the output should be plain text, formatted as a LinkedIn post. It should include:\n1.  An engaging hook.\n2.  A concise description of the product\'s value proposition and benefits.\n3.  A clear call to action.\n4.  Relevant and strategic hashtags.\n5.  The `product_link` at the end or within the call to action.\n</output_format>\n\n<tone_of_voice>\nProfessional, informative, engaging, benefit-oriented, and slightly enthusiastic.\n</tone_of_voice>\n\n<best_practices>\n-   **Audience Focus:** Analyze the product description to identify the primary target audience and tailor the language, benefits, and call to action specifically for them.\n-   **Hook:** Start with a question, a bold statement, or a compelling statistic to grab attention.\n-   **Problem/Solution:** Frame the product as a solution to a common problem faced by the target audience.\n-   **Value Proposition:** Clearly articulate the unique value and key benefits the product offers.\n-   **Call to Action (CTA):** Guide the reader on the next step (e.g., "Learn more," "Discover how," "Get started today").\n-   **Hashtags:** Use a mix of broad and niche hashtags relevant to the industry, product, and target audience. Aim for 3-5 relevant hashtags.\n-   **Conciseness:** LinkedIn posts perform well when they are direct and to the point, while still providing enough information to pique interest.\n</best_practices>\n\n<input_format>\nThe input will be provided in the following structure:\n\n```\n<product_description>\n[Product description text]\n</product_description>\n\n<product_name>\n[Product name]\n</product_name>\n\n<product_link>\n[Product URL]\n</product_link>\n```\n</input_format>\n\n<example_input>\n<product_description>\nOur new AI-powered content creation tool, "ContentGenius," helps marketing teams generate high-quality blog posts, social media updates, and email copy in minutes. It uses advanced natural language processing to understand your brand voice and audience, ensuring consistent and engaging content without the usual time commitment. Say goodbye to writer\'s block and hello to scalable content production.\n</product_description>\n\n<product_name>\nContentGenius\n</product_name>\n\n<product_link>\nhttps://www.contentgenius.com/launch\n</product_link>\n</example_input>\n\n<example_output>\nTired of endless content creation cycles and writer\'s block? 😩\n\nImagine generating high-quality blog posts, social media updates, and email copy in minutes, all while maintaining your unique brand voice. With **ContentGenius**, marketing teams can finally scale their content production effortlessly.\n\nOur AI-powered tool leverages advanced NLP to understand your audience and deliver consistent, engaging content, freeing up your team to focus on strategy and creativity. Stop wasting hours on drafts and start publishing impactful content faster than ever before.\n\nDiscover how ContentGenius can revolutionize your content strategy today!\n👉 Learn more: https://www.contentgenius.com/launch\n\n#ContentMarketing #AItools #MarketingAutomation #ContentCreation #DigitalMarketing\n</example_output>',
          dirty: false,
          modelId: "gemini-2.5-flash",
          loading: false,
          output:
            '# Linkedin\nTired of your digital files feeling like a black hole of unorganized documents? 😩 The endless search for "that one file" ends now.\n\nIntroducing **Dynbox**, the AI-powered file organizer designed to bring order to your digital chaos. Imagine having a personal AI assistant that not only manages your cloud files (Google Drive, Dropbox, OneDrive) but also learns your preferences.\n\nWith Dynbox, you can:\n*   **Chat to Organize:** Simply tell the AI to move, rename, or clean up files.\n*   **Automate Everything:** Set up smart rules to automatically sort new files into the right folders.\n*   **Find by Meaning:** Our semantic search lets you locate documents by describing their content, not just their filename.\n*   **Stay Private:** Your files never leave your cloud storage, ensuring maximum privacy.\n\nStop wasting hours on manual sorting and version control vertigo. Reclaim your productivity and transform your digital life.\n\nReady to experience effortless file management?\nDiscover Dynbox today: https://dynbox.app\n\n#FileManagement #AItools #Productivity #DigitalOrganization #CloudStorage #SaaS',
        },
        position: {
          x: -1140.7894108283679,
          y: 736.7976948896797,
        },
        width: 632,
        height: 575,
        type: "ai",
      },
      {
        id: "1751464814747-wtt6ram3q",
        data: {
          dirty: false,
          loading: false,
          output:
            '# Linkedin\nTired of your digital files feeling like a black hole of unorganized documents? 😩 The endless search for "that one file" ends now.\n\nIntroducing **Dynbox**, the AI-powered file organizer designed to bring order to your digital chaos. Imagine having a personal AI assistant that not only manages your cloud files (Google Drive, Dropbox, OneDrive) but also learns your preferences.\n\nWith Dynbox, you can:\n*   **Chat to Organize:** Simply tell the AI to move, rename, or clean up files.\n*   **Automate Everything:** Set up smart rules to automatically sort new files into the right folders.\n*   **Find by Meaning:** Our semantic search lets you locate documents by describing their content, not just their filename.\n*   **Stay Private:** Your files never leave your cloud storage, ensuring maximum privacy.\n\nStop wasting hours on manual sorting and version control vertigo. Reclaim your productivity and transform your digital life.\n\nReady to experience effortless file management?\nDiscover Dynbox today: https://dynbox.app\n\n#FileManagement #AItools #Productivity #DigitalOrganization #CloudStorage #SaaS',
          text: '# Linkedin\nTired of your digital files feeling like a black hole of unorganized documents? 😩 The endless search for "that one file" ends now.\n\nIntroducing **Dynbox**, the AI-powered file organizer designed to bring order to your digital chaos. Imagine having a personal AI assistant that not only manages your cloud files (Google Drive, Dropbox, OneDrive) but also learns your preferences.\n\nWith Dynbox, you can:\n*   **Chat to Organize:** Simply tell the AI to move, rename, or clean up files.\n*   **Automate Everything:** Set up smart rules to automatically sort new files into the right folders.\n*   **Find by Meaning:** Our semantic search lets you locate documents by describing their content, not just their filename.\n*   **Stay Private:** Your files never leave your cloud storage, ensuring maximum privacy.\n\nStop wasting hours on manual sorting and version control vertigo. Reclaim your productivity and transform your digital life.\n\nReady to experience effortless file management?\nDiscover Dynbox today: https://dynbox.app\n\n#FileManagement #AItools #Productivity #DigitalOrganization #CloudStorage #SaaS',
        },
        position: {
          x: -1130.0871699130762,
          y: 1431.1787655739183,
        },
        width: 606,
        height: 728,
        type: "markdown",
      },
      {
        id: "1751464904441-3811etes9",
        data: {
          systemPrompt:
            '<ai_persona>\nYou are a highly skilled social media marketing specialist with expertise in crafting engaging and high-visibility Facebook posts. You understand audience psychology, platform best practices, and how to drive engagement.\n</ai_persona>\n\n<ai_goal>\nYour sole goal is to generate a single, compelling Facebook post based on the provided product details and target audience. The post must be optimized for maximum visibility and engagement within that specific audience.\n</ai_goal>\n\n<ai_constraints>\n- Respond ONLY with the Facebook post. Do not include any conversational text, explanations, or additional commentary.\n- The post MUST include the product name and product link provided in the input.\n- The post should be concise, engaging, and directly appeal to the specified target audience.\n- Use appropriate emojis and relevant hashtags.\n- Include a clear call to action.\n</ai_constraints>\n\n<input_format>\nThe user will provide input in the following XML structure:\n<product_details>\n    <product_name> [Product Name] </product_name>\n    <product_description> [Detailed description of the product, its features, and benefits] </product_description>\n    <product_link> [URL to the product page] </product_link>\n    <target_audience> [Description of the target audience, e.g., "young parents looking for convenience", "tech enthusiasts", "eco-conscious consumers"] </target_audience>\n</product_details>\n</input_format>\n\n<output_format>\nStart with "# Facebook"\nAnd then, plain text, representing the complete Facebook post.\n</output_format>\n\n<ai_instructions>\n1.  **Analyze Audience:** Deeply understand the `target_audience` to tailor the message, tone, and benefits.\n2.  **Extract Key Benefits:** Identify the most compelling benefits from the `product_description` that resonate with the `target_audience`.\n3.  **Craft Engaging Hook:** Start with a strong opening sentence that grabs attention.\n4.  **Highlight Value:** Focus on how the product solves a problem or improves the life of the `target_audience`.\n5.  **Integrate Product Details:** Seamlessly weave in the `product_name` and `product_link`.\n6.  **Use Emojis:** Incorporate relevant emojis to enhance visual appeal and convey emotion.\n7.  **Select Hashtags:** Choose 3-5 highly relevant and popular hashtags that the `target_audience` might follow.\n8.  **Call to Action:** End with a clear and concise call to action (e.g., "Learn more," "Shop now," "Get yours today!").\n9.  **Review for Conciseness:** Ensure the post is impactful without being overly long.\n</ai_instructions>',
          loading: false,
          dirty: false,
          modelId: "gemini-2.5-flash",
          output:
            '# Facebook\nTired of your digital files feeling like a chaotic black hole? 😩 Is your "Downloads" folder a disaster zone? 🤯\n\nSay goodbye to endless searching and manual sorting! Meet **Dynbox** – your AI-powered file organizing assistant that brings order to your digital life.\n\n✨ Chat with your files like a personal assistant, automate tedious organization, and find anything by *meaning* with intelligent semantic search. Reclaim hours of your day and enjoy a stress-free workspace! Your privacy is always protected too. 🔒\n\nReady to transform your digital clutter into calm?\nLearn more and try Dynbox for FREE today! 👇\nhttps://dynbox.app\n\n#FileManagement #DigitalOrganization #Productivity #AItools #WorkSmart',
        },
        position: {
          x: 313.99999999999943,
          y: 735.9999999999987,
        },
        width: 629,
        height: 583,
        type: "ai",
      },
      {
        id: "1751464911802-a13xsdlnz",
        data: {
          loading: false,
          dirty: false,
          output:
            '# Facebook\nTired of your digital files feeling like a chaotic black hole? 😩 Is your "Downloads" folder a disaster zone? 🤯\n\nSay goodbye to endless searching and manual sorting! Meet **Dynbox** – your AI-powered file organizing assistant that brings order to your digital life.\n\n✨ Chat with your files like a personal assistant, automate tedious organization, and find anything by *meaning* with intelligent semantic search. Reclaim hours of your day and enjoy a stress-free workspace! Your privacy is always protected too. 🔒\n\nReady to transform your digital clutter into calm?\nLearn more and try Dynbox for FREE today! 👇\nhttps://dynbox.app\n\n#FileManagement #DigitalOrganization #Productivity #AItools #WorkSmart',
          text: '# Facebook\nTired of your digital files feeling like a chaotic black hole? 😩 Is your "Downloads" folder a disaster zone? 🤯\n\nSay goodbye to endless searching and manual sorting! Meet **Dynbox** – your AI-powered file organizing assistant that brings order to your digital life.\n\n✨ Chat with your files like a personal assistant, automate tedious organization, and find anything by *meaning* with intelligent semantic search. Reclaim hours of your day and enjoy a stress-free workspace! Your privacy is always protected too. 🔒\n\nReady to transform your digital clutter into calm?\nLearn more and try Dynbox for FREE today! 👇\nhttps://dynbox.app\n\n#FileManagement #DigitalOrganization #Productivity #AItools #WorkSmart',
        },
        position: {
          x: 325.9999999999994,
          y: 1439.2499999999973,
        },
        width: 600,
        height: 600,
        type: "markdown",
      },
      {
        id: "1751467321856-kcvl3qqn0",
        data: {
          text: "Here is a more advanced example of usage to generate social media posts for your product.",
          loading: false,
        },
        position: {
          x: -556.3914637110003,
          y: -552.3532756148795,
        },
        width: 608,
        height: 187,
        type: "annotation",
      },
      {
        id: "1751467363387-ymbgwtvmc",
        data: {
          text: "Combining two prompt input    👉\nAnd displaying it",
          loading: false,
        },
        position: {
          x: -997.961303381483,
          y: 28.210920236932395,
        },
        width: 400,
        height: 148,
        type: "annotation",
      },
      {
        id: "1751467405872-saphetfcu",
        data: {
          text: "One custom system prompt per social media",
          loading: false,
        },
        position: {
          x: -435.5760073332569,
          y: 585.305259854064,
        },
        width: 553,
        height: 122,
        type: "annotation",
      },
      {
        id: "1751469114503-snh4gtgwb",
        data: {
          text: "I used the Meta Prompting workflow to make those system prompts 🤯",
          loading: false,
        },
        position: {
          x: -1600,
          y: 922,
        },
        width: 412,
        height: 164,
        type: "annotation",
      },
    ],
    edges: [
      {
        id: "xy-edge__1751404698715-neehk4dvb-3",
        source: "1751404698715-neehk4dvb",
        target: "3",
        animated: false,
      },
      {
        id: "xy-edge__1-3",
        source: "1",
        target: "3",
        animated: false,
      },
      {
        id: "xy-edge__3-2",
        source: "3",
        target: "2",
        animated: false,
      },
      {
        id: "xy-edge__2-1751464384581-z10o61kq4",
        source: "2",
        target: "1751464384581-z10o61kq4",
        animated: false,
      },
      {
        id: "xy-edge__1751464788964-th4eribuu-1751464814747-wtt6ram3q",
        source: "1751464788964-th4eribuu",
        target: "1751464814747-wtt6ram3q",
        animated: false,
      },
      {
        id: "xy-edge__3-1751464788964-th4eribuu",
        source: "3",
        target: "1751464788964-th4eribuu",
        animated: false,
      },
      {
        id: "xy-edge__3-1751464904441-3811etes9",
        source: "3",
        target: "1751464904441-3811etes9",
        animated: false,
      },
      {
        id: "xy-edge__1751464904441-3811etes9-1751464911802-a13xsdlnz",
        source: "1751464904441-3811etes9",
        target: "1751464911802-a13xsdlnz",
        animated: false,
      },
    ],
    createdAt: "2025-07-01T21:14:46.861Z",
    updatedAt: "2025-07-03T08:14:13.125Z",
  },
  {
    id: "1751394123995-ip1wqog5q",
    name: "Text improver (advanced)",
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
          x: -278.7340991629627,
          y: -131.92507599809147,
        },
        width: 500,
        height: 200,
        type: "prompt",
      },
      {
        id: "2",
        data: {
          systemPrompt:
            "Proofread this text, fix any english mistakes. \nAlso Improve the text, adapt your tone and wording based on the context.\n\nGenerate 5 different variations with various directions, like concise, shorter, formal, casual, etc. be creative.\n\nOutput only the raw text of each versions separated with `\\n\\n---\\n\\n`.",
          modelId: "gemini-2.5-flash",
          loading: false,
          output:
            "Thanks for the offer! Glad you like the laptop. €1150 is a bit lower than I'd hoped, considering the component value and excellent condition. Would you be able to meet at €1250? I believe that's a fair price for this setup.\n\n---\n\nThank you for your offer! I'm pleased you appreciate the laptop's condition. While I appreciate your bid, €1150 is a little below my expectation, given the current market value of its components and its pristine state. Would you be open to meeting at €1250? I believe this represents a fair valuation for a system of this caliber.\n\n---\n\nHey, awesome offer! Super glad you're digging the laptop. €1150 is a bit shy of what I was aiming for, especially with these specs and how well it's been kept. How about we meet in the middle at €1250? I think that's a solid deal for a rig like this.\n\n---\n\nThanks for the offer! €1150 is a bit low for this laptop's condition and components. Could you do €1250? That's a fair price.\n\n---\n\nAppreciate the offer and glad you see the value in the laptop! Given the high-end components and its excellent, near-new condition, €1150 is a bit under what I'm looking for. This machine is a powerhouse, and I think €1250 is a very fair price for the performance and quality you're getting. Could we agree on that?",
          dirty: false,
        },
        position: {
          x: 100.2540119045467,
          y: 243.1301225487063,
        },
        width: 460,
        height: 373,
        type: "ai",
      },
      {
        id: "1751394367426-80tty78ra",
        data: {
          prompt: "this is a response for a Vinted listing to sell a laptop",
          label: "context",
          dirty: false,
          loading: false,
          output: "this is a response for a Vinted listing to sell a laptop",
        },
        position: {
          x: 261.1442972335333,
          y: -128.32741491648613,
        },
        width: 393,
        height: 194,
        type: "prompt",
      },
      {
        id: "1751394991912-bq0z92zzg",
        data: {
          loading: false,
          output:
            "Thanks for the offer! Glad you like the laptop. €1150 is a bit lower than I'd hoped, considering the component value and excellent condition. Would you be able to meet at €1250? I believe that's a fair price for this setup.\n\n---\n\nThank you for your offer! I'm pleased you appreciate the laptop's condition. While I appreciate your bid, €1150 is a little below my expectation, given the current market value of its components and its pristine state. Would you be open to meeting at €1250? I believe this represents a fair valuation for a system of this caliber.\n\n---\n\nHey, awesome offer! Super glad you're digging the laptop. €1150 is a bit shy of what I was aiming for, especially with these specs and how well it's been kept. How about we meet in the middle at €1250? I think that's a solid deal for a rig like this.\n\n---\n\nThanks for the offer! €1150 is a bit low for this laptop's condition and components. Could you do €1250? That's a fair price.\n\n---\n\nAppreciate the offer and glad you see the value in the laptop! Given the high-end components and its excellent, near-new condition, €1150 is a bit under what I'm looking for. This machine is a powerhouse, and I think €1250 is a very fair price for the performance and quality you're getting. Could we agree on that?",
          text: "Thanks for the offer! Glad you like the laptop. €1150 is a bit lower than I'd hoped, considering the component value and excellent condition. Would you be able to meet at €1250? I believe that's a fair price for this setup.\n\n---\n\nThank you for your offer! I'm pleased you appreciate the laptop's condition. While I appreciate your bid, €1150 is a little below my expectation, given the current market value of its components and its pristine state. Would you be open to meeting at €1250? I believe this represents a fair valuation for a system of this caliber.\n\n---\n\nHey, awesome offer! Super glad you're digging the laptop. €1150 is a bit shy of what I was aiming for, especially with these specs and how well it's been kept. How about we meet in the middle at €1250? I think that's a solid deal for a rig like this.\n\n---\n\nThanks for the offer! €1150 is a bit low for this laptop's condition and components. Could you do €1250? That's a fair price.\n\n---\n\nAppreciate the offer and glad you see the value in the laptop! Given the high-end components and its excellent, near-new condition, €1150 is a bit under what I'm looking for. This machine is a powerhouse, and I think €1250 is a very fair price for the performance and quality you're getting. Could we agree on that?",
          dirty: false,
        },
        position: {
          x: 11.302028858417998,
          y: 714.2871198744728,
        },
        width: 600,
        height: 600,
        type: "markdown",
      },
      {
        id: "1751395085173-6r7s0a667",
        data: {
          systemPrompt:
            "Which of these versions is the best based on the context and audience?\n\nJust respond with the raw text of the best version.",
          loading: false,
          modelId: "gemini-2.5-flash",
          output:
            "Appreciate the offer and glad you see the value in the laptop! Given the high-end components and its excellent, near-new condition, €1150 is a bit under what I'm looking for. This machine is a powerhouse, and I think €1250 is a very fair price for the performance and quality you're getting. Could we agree on that?",
          dirty: false,
        },
        position: {
          x: 439.9882881560062,
          y: 1437.5461371530457,
        },
        width: 517,
        height: 247,
        type: "ai",
      },
      {
        id: "1751395188829-ywaes2v74",
        data: {
          loading: false,
          output:
            "Appreciate the offer and glad you see the value in the laptop! Given the high-end components and its excellent, near-new condition, €1150 is a bit under what I'm looking for. This machine is a powerhouse, and I think €1250 is a very fair price for the performance and quality you're getting. Could we agree on that?",
          text: "Appreciate the offer and glad you see the value in the laptop! Given the high-end components and its excellent, near-new condition, €1150 is a bit under what I'm looking for. This machine is a powerhouse, and I think €1250 is a very fair price for the performance and quality you're getting. Could we agree on that?",
          dirty: false,
        },
        position: {
          x: 360.74890714110654,
          y: 1783.4279278881809,
        },
        width: 678,
        height: 321,
        type: "markdown",
      },
      {
        id: "1751467596003-2odfqg01q",
        data: {
          text: "Here is an example on how you can chain AI 🔗 to do more advanced stuff.\n\nHere we proofread and improve a text by generating 5 alternative versions and picking the best one.",
          loading: false,
        },
        position: {
          x: -59.14196474823473,
          y: -537.7176521445068,
        },
        width: 641,
        height: 287,
        type: "annotation",
      },
      {
        id: "1751467675096-kehl0ok7a",
        data: {
          prompt: "about 25 years old\na little techy",
          label: "target audience",
          dirty: false,
          loading: false,
          output: "about 25 years old\na little techy",
        },
        position: {
          x: 688.1832601171136,
          y: -129.7032272262249,
        },
        width: 368,
        height: 200,
        type: "prompt",
      },
      {
        id: "1751467871115-0q26zzl9q",
        data: {
          text: "You can add labels to prompts so the AI knows what it's about when given multiple input at once.\n👇",
          loading: false,
        },
        position: {
          x: 772.3690294207054,
          y: -284.4310265003847,
        },
        width: 595,
        height: 175,
        type: "annotation",
      },
      {
        id: "1751468448609-8n72073so",
        data: {
          text: "Generate 5 variations 👉",
          loading: false,
        },
        position: {
          x: -196.99177920278765,
          y: 381.75068506643436,
        },
        width: 288,
        height: 120,
        type: "annotation",
      },
      {
        id: "1751468458582-f9t33ckih",
        data: {
          text: "👈 Will pick the best one",
          loading: false,
        },
        position: {
          x: 973.7981452301565,
          y: 1520.0748946587046,
        },
        width: 300,
        height: 200,
        type: "annotation",
      },
      {
        id: "1751468477166-yl0vtdekn",
        data: {
          text: "It is using the AI output as input   👆",
          loading: false,
        },
        position: {
          x: 22.23152786720061,
          y: 1313.4630507891115,
        },
        width: 517,
        height: 126,
        type: "annotation",
      },
      {
        id: "1zlcYsaQJwS7Dg7Y9XY2D",
        data: {
          text: "The inputs 👉",
          loading: false,
        },
        position: {
          x: -512.5249579255776,
          y: -107.49474814282726,
        },
        width: 200,
        height: 133,
        type: "annotation",
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
        id: "xy-edge__1751394367426-80tty78ra-2",
        source: "1751394367426-80tty78ra",
        target: "2",
        animated: false,
      },
      {
        id: "xy-edge__2-1751394991912-bq0z92zzg",
        source: "2",
        target: "1751394991912-bq0z92zzg",
        animated: false,
      },
      {
        id: "xy-edge__1751394991912-bq0z92zzg-1751395085173-6r7s0a667",
        source: "1751394991912-bq0z92zzg",
        target: "1751395085173-6r7s0a667",
        animated: false,
      },
      {
        id: "xy-edge__1751394367426-80tty78ra-1751395085173-6r7s0a667",
        source: "1751394367426-80tty78ra",
        target: "1751395085173-6r7s0a667",
        animated: false,
      },
      {
        id: "xy-edge__1751395085173-6r7s0a667-1751395188829-ywaes2v74",
        source: "1751395085173-6r7s0a667",
        target: "1751395188829-ywaes2v74",
        animated: false,
      },
      {
        id: "xy-edge__1751467675096-kehl0ok7a-2",
        source: "1751467675096-kehl0ok7a",
        target: "2",
        animated: false,
      },
      {
        id: "xy-edge__1751467675096-kehl0ok7a-1751395085173-6r7s0a667",
        source: "1751467675096-kehl0ok7a",
        target: "1751395085173-6r7s0a667",
        animated: false,
      },
    ],
    updatedAt: "2025-07-03T08:30:21.350Z",
    createdAt: "2025-07-01T18:09:19.241Z",
  },
]
  .map(getCleanedWorkflow)
  .map((c, i) => {
    const id = nanoid();
    const date = new Date(Date.now() - i * 100);
    return {
      ...c,
      id,
      createdAt: date.toISOString(),
      updatedAt: date.toISOString(),
    };
  });

export const newWorkflow: Workflow = getCleanedWorkflow({
  id: "wbGpxkMpPkpVgxlbMWFQc",
  name: "Workflow 4",
  nodes: [
    {
      id: "1",
      data: {
        prompt: "",
        dirty: false,
        loading: false,
        output: "",
      },
      position: {
        x: 0,
        y: -80,
      },
      width: 500,
      height: 200,
      type: "prompt",
    },
    {
      id: "2",
      data: {
        systemPrompt: "",
        dirty: true,
        error: "No model selected",
        loading: false,
      },
      position: {
        x: 0,
        y: 210,
      },
      width: 500,
      height: 320,
      type: "ai",
    },
    {
      id: "3",
      data: {
        dirty: true,
        loading: false,
      },
      position: {
        x: -50,
        y: 640,
      },
      width: 600,
      height: 600,
      type: "markdown",
    },
    {
      id: "1Eln228LOIuueaQsjo7iS",
      data: {
        text: "1. Enter a prompt, it will be the input 👉",
        loading: false,
      },
      position: {
        x: -436,
        y: -44,
      },
      width: 426,
      height: 108,
      type: "annotation",
    },
    {
      id: "G1cVLVR_UXqHuJTvcSDy6",
      data: {
        text: "2. (optional) add a label to that input\n👇",
        loading: false,
      },
      position: {
        x: 75,
        y: -224,
      },
      width: 466,
      height: 131,
      type: "annotation",
    },
    {
      id: "1cUhWCJYY2yPIz1E8QTZ2",
      data: {
        text: "3. Select an AI model\n👈",
        loading: false,
      },
      position: {
        x: 526,
        y: 203,
      },
      width: 400,
      height: 150,
      type: "annotation",
    },
    {
      id: "2JvN0X5g11MosW9jPWa-e",
      data: {
        text: "4. Make a system prompt, it will act as instruction for the AI model                        👉",
        loading: false,
      },
      position: {
        x: -476,
        y: 288,
      },
      width: 467,
      height: 142,
      type: "annotation",
    },
    {
      id: "F20aItwJy3PrXqsRhNsl3",
      data: {
        text: "5. Press ▶️ and see the result here!\n👈",
        loading: false,
      },
      position: {
        x: 580,
        y: 684,
      },
      width: 400,
      height: 150,
      type: "annotation",
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
  createdAt: "2025-07-03T09:15:18.731Z",
  updatedAt: "2025-07-03T09:19:45.613Z",
});
