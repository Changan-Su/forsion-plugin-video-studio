# Changelog

## 0.10.0 — 2026-10-05

- 新建视频可以选保存位置：新建页的名称旁边多了一栏「保存位置」，填笔记库里的文件夹（比如 `视频/2026`），留空就是默认的工作文件夹；工程建在 `<位置>/<名字>/` 里，页面下方会写出完整的去处。上次填的位置会记住，下次打开新建页已经填好，清空就回到默认位置。只能选笔记库里的文件夹：插件读写文件走的是笔记库，库外的路径（`/Users/…`、`~/…`、`C:\…`）会被当场拒绝并说明原因。
- 工程可以管理了。启动台「我的工程」和编辑器里的工程选择器，每一行都有「⋯」，右键也一样，打开的是同一份菜单：重命名…、在文件夹中显示、删除。
- 重命名改的是工程的名称，不动文件夹和文件名：和 AI 导演的对话是按工程文件夹记的，文件夹一改名，这个工程的对话就对不上了。工程正开着时由编辑器来改，还没保存的改动一起留下。
- 删除是移到 Forsion 的回收站，可以在笔记的回收站里恢复，所以不再二次确认。工程文件夹里只有这个工程和它的素材（`media/`、`audio/`、`assets/`、`generated/`，以及它自己导出的网页、MP4 和字幕文件）时，整个文件夹一起移走；文件夹里还有别的文件时只移走工程文件，并告诉你其余的没有动。正开着的工程会先关掉再删，删完不会被写回来。和 AI 导演的那条对话不会跟着删：它在会话列表里以工程文件夹命名的项目下，可以在那边移除。
- 删除需要 Forsion 提供 `ctx.app.trash`（2.12.2 之后的版本，尚未发布）。没有这个接口的 Forsion 上菜单里没有「删除」，重命名和在文件夹中显示照常可用。
- 新建的工程是空的，不再带三个演示场景。舞台中央是起步的三件事：新场景（从模板里挑）、导入素材、AI 导演；场景轨上写着怎么开始；还没有场景时「导出」不可用。完整示例仍在「打开示例 · 第 2.12 话」。命令行的 `fvs new --template eva|blank` 不变。
- 素材区右键菜单的「删除」可用了（同样移到回收站，需要 `ctx.app.trash`）：场景里还在用的文件不能删，菜单上会注明。原先灰着的「重命名」拿掉了，Forsion 还没有这个接口。
- 关闭或删除工程回到启动台时，右栏跟着收起，不再留一列「这个侧栏是空的」。右栏本来就被你收起时不动它。
- 工程选择器不再重复一遍标题和说明：列表在前，「新建」和「示例」在后，也不再多出一个实心按钮。
- 修复：别的程序直接在磁盘上改了正开着的工程文件（AI 导演就是这样改的），编辑器不会自己载入，要关掉重开才看得到。原因在 Forsion：它的文件监视把所有 `.md` 结尾的文件都当成笔记，不通知插件（2.12.2 和之后的版本都是这样）。编辑器现在每 2 秒自己核对一次磁盘，有改动就载入；你这边有没保存的改动时，照旧先问你保留哪一份。
- 修复：空工程的时间线提示挤成一列，压住下面的轨道；现在排成一行。
- 元素轨的提示改成了大白话（原来写的是 `data-in`）；空工程不再在「问题」里报一条英文的 no scenes；启动台没有工程时不再留一行表头。
- 需要的 Forsion 和 0.9.1 相同；只有「删除」需要更新的 Forsion（见上）。
- **English:** Choose where a new video goes: the New video page has a Location field next to the name. Type a folder of the notes library (for example `Videos/2026`) or leave it empty for the default work folder; the project is created in `<location>/<name>/`, and the page says where that is. The folder you typed is remembered and offered again next time; clear it to go back to the default. Only folders inside the notes library can be used, because the plugin reads and writes through the library: a path outside it (`/Users/…`, `~/…`, `C:\…`) is refused with the reason. Projects can be managed: every row of My projects and of the editor's project picker has a "⋯" button, and a right click does the same; both open one menu: Rename…, Show in folder, Delete. Rename changes the project's name, not its folder or file name: the conversation with the AI Director is kept per project folder, and renaming the folder would detach it. An open project is renamed by its editor, so unsaved changes are kept. Delete moves the project to Forsion's recycle bin, where it can be restored from the notes' recycle bin, so there is no confirmation. When the project folder holds only the project and its media (`media/`, `audio/`, `assets/`, `generated/`, and its own exports: the web page, MP4 renders and caption files), the whole folder goes; when it holds anything else, only the project file goes and you are told the rest was left alone. An open project is closed first, and nothing writes it back afterwards. The conversation with the AI Director is not deleted with it: it stays in the session list, under the project named after the folder, and can be removed there. Delete needs `ctx.app.trash` from Forsion (later than 2.12.2, not released yet); on a Forsion without it the menu has no Delete, and Rename and Show in folder work as usual. A new project is empty: the three demo scenes are gone. The stage shows three ways to start (New scene from a template, Import media, AI Director), the Scenes track says how to begin, and Export is unavailable until there is a scene. The complete example is still under Open the 2.12 example, and `fvs new --template eva|blank` on the command line is unchanged. Delete in the media bin's right-click menu now works (to the recycle bin as well; it needs `ctx.app.trash`): a file a scene still uses cannot be deleted, and the menu says so. The disabled Rename there is gone, since Forsion has no interface for it yet. Closing or deleting a project now folds the right side as you return to the launchpad, instead of leaving an empty column there; a side you folded yourself is left alone. The project picker no longer repeats its title and description: the list comes first, New and the example after it, and there is no second filled button. Fixed: a change written to an open project on disk by another program (which is how the AI Director edits) was not loaded until the project was reopened. The cause is in Forsion: its file watcher treats every file ending in `.md` as a note and does not tell plugins (2.12.2 and the builds after it). The editor now checks the disk every 2 seconds and loads what changed; when you have unsaved changes of your own it still asks which copy to keep. Fixed: the hint on an empty project's timeline was squeezed into a narrow column over the tracks below; it is on one line now. The Elements track's hint is in plain words (it used to say `data-in`), an empty project no longer lists "no scenes" under Problems, and the launchpad shows no column titles over an empty list. Forsion versions: the same as 0.9.1; only Delete needs a newer Forsion, as above.

## 0.9.1 — 2026-10-05

- 修复：恢复 Space 的默认布局之后属性面板没了，在时间线上点什么右栏都没有反应；把右栏收起再展开、去别的 Space 再回来也一样。Forsion 重排布局时会把属性面板收走，插件把这当成了「你把它关了」，从此不再打开。现在只有你自己关的才算数：用走带右侧的属性按钮关掉后不再自动打开；布局被重置、右栏重新展开、回到这个 Space 时，属性面板自己回来。右栏里没有对话时（还没有右栏对话的 Forsion，或者你把对话标签关了），面板的 × 和 Esc 仍算关掉：点一次属性按钮或时间线左边的轨道名就回来。这种时候把右栏收起：2.12.2 及更早的 Forsion 分不清「收起」和「关掉面板」，也会记成关掉；之后的 Forsion（Extend View 多了一个关闭原因 `layout`，尚未发布）会告诉插件这是收起，不再记成关掉，对话随右栏回来时属性也回来。右栏展开后若只是一块空侧栏（没有对话跟着回来），属性仍要点一次属性按钮或轨道名才回来。
- 在时间线上点场景、元素、拍点、字幕，或在画面里点文字、图片，属性面板会翻到前面（哪怕前面是对话），键盘仍留在时间线上。右栏被你收起、或者里面的标签都被你关掉时，这些点击不会把它弹开；用属性按钮关掉之后也不会。属性被对话挡在后面时，点走带右侧的属性按钮是把它翻到前面，再点一次才关掉。
- 修复：进入视频工作室 Space 时启动台闪一下才出现工程，右栏还多出一个「空侧栏」标签。那枚标签还有一个 Forsion 自己的来由：右栏被关空之后再由插件打开对话，Forsion 的空侧栏占位不退场，而它没有关闭入口。已在 Forsion 里修复（尚未发布）；带修复的 Forsion 上，以前留下的那枚在下一次打开对话时消失。
- 修复：导入文件的途中编辑器被重建（恢复默认布局、去别的 Space 再回来、换工程）时，迟到的那次导入会拿旧内容改写工程文件，可能盖掉这之后的改动。现在关掉的编辑器不再改工程：文件照常存进工程文件夹，素材区会列出来，要用再从素材区放进时间线。这种迟到的文件也不会盖掉你这期间在新编辑器里导入的同名文件，它会换一个名字存（`名字-2`）。
- 时间线左边的轨道名可以点：「字幕」打开属性的字幕页，「场景」「元素」打开场景页，「配乐」打开工程页里那条音轨的设置。点配乐轨上的音频块也会定位到它的设置（起点、音量、移除）。
- 空的配乐轨上多了两个按钮：「添加音频…」（从电脑选音乐或音效）和「让导演配乐」；照旧可以把文件直接拖上去。工程页的音轨一栏里也有「让导演配乐」。
- 「AI 导演」按钮在右栏有对话的 Forsion 上是一个菜单：打开对话，以及六件可以交给导演的事（写一个新场景、节奏再紧一点、润色全部文案、为这个视频配乐、检查并修正卡点、看一遍成片提意见）。「配乐」和「看一遍成片提意见」不再放在「更多」里，「更多」只剩窗口和工程的选项。选一项会把请求写进对话的输入框并提示你，回车才发出：后三项是一句完整的话，前三项只写开头，等你补充。
- 在 Space 里，走带右侧的属性按钮换成滑杆图标，和 Forsion 自己的「收起右栏」按钮分开。
- 换了新图标：暖白色的场记板（包根 `icon.png`，可编辑的源文件 `icon.svg`）。设置里的插件列表和 Space 入口都用它。
- 需要的 Forsion 和 0.9.0 相同。右栏没有对话的 Forsion（含 2.12.2）上，「AI 导演」照旧打开原来的面板，六件事在面板的「常用任务」里，照旧直接交给它。
- **English:** Fixed: after restoring the Space's default layout the Properties panel was gone and nothing clicked on the timeline brought anything up on the right; the same after folding the right side and opening it again, or after a visit to another Space. Forsion takes the panel away when it rebuilds a layout, and the plugin read that as "you closed it" and never opened it again. Only what you close yourself counts now: turned off with the Properties button under the stage, it stays off; after a layout reset, when the right side opens again, and when you come back to the Space, Properties return on their own. While the right side has no conversation in it (a Forsion without the conversation there, or after you closed its tab), the panel's × and Esc still count as turning Properties off: the Properties button or a track name on the timeline brings them back. Folding the side in that state: Forsion up to 2.12.2 cannot tell a fold from closing the panel and records it as off too; a later Forsion (a new Extend View close reason, `layout`, not released yet) tells the plugin it was a fold, which no longer turns Properties off, and they return when the conversation comes back with the side. If the side opens again as an empty side (no conversation coming back with it), Properties still wait for the Properties button or a track name. A click on a scene, an element, a hit or a caption on the timeline, or on text or a picture on the stage, brings Properties to the front (even from behind the conversation) while the keyboard stays on the timeline. With the right side folded, or after you closed every tab in it, those clicks do not open it; nor after you turned Properties off with the button. When Properties are behind the conversation, the Properties button under the stage brings them forward, and the next click turns them off. Fixed: entering the Video Studio Space flashed the launch page before the project, and left an extra "empty side" tab on the right. That tab also had a cause in Forsion itself: when the plugin opened the conversation in a right side that had been emptied, Forsion's empty-side placeholder stayed beside it, and it has no way to be closed. Fixed in Forsion (not released yet); on a Forsion with the fix, one left over from before goes away the next time the conversation is opened. Fixed: when the editor was rebuilt while files were still being imported (a layout reset, another Space and back, another project), the late import rewrote the project file from the old editor's text and could overwrite changes made since. An editor that was closed no longer changes the project: the file is still stored in the project folder and listed in the bin, to be placed from there. Such a late file no longer lands on a file of the same name that you imported in the new editor meanwhile either: it is stored under a name of its own (`name-2`). The track names on the left of the timeline are buttons: Captions opens the Captions tab of Properties, Scenes and Elements open the Scene tab, Music opens that track's settings on the Project tab. A click on an audio block on the Music track also goes to its settings (start, gain, remove). An empty Music track now carries two buttons, Add audio… (pick music or sound from the computer) and Ask for a score; dropping a file on it still works. The audio section of the Project tab has Ask for a score as well. On a Forsion with the conversation in the right side, the AI Director button is a menu: Open the conversation, and six things to ask the Director for (Write a new scene, Tighten the pacing, Polish all the copy, Score this video, Check and fix the sync, Review the cut). Score and Review are no longer under More, which keeps the window and project options only. Choosing one writes the request into the conversation's input and tells you so; Enter sends it. The last three are a complete sentence, the first three only a start for you to finish. In a Space, the Properties button under the stage is now a sliders icon, to tell it apart from Forsion's own fold-the-right-side button. Forsion versions: the same as 0.9.0. On a Forsion without the conversation in the right side (2.12.2 included), the AI Director still opens the previous panel, with the six tasks under Quick tasks, handed straight to it as before. A new icon: a warm white clapperboard (`icon.png` at the package root, with its editable source `icon.svg`), shown in the plugin list in Settings and on the Space entry.

## 0.9.0 — 2026-10-04

- 画面里的元素也在时间线上：场景轨下面多一条「元素」轨，写了出现时间的元素（`data-in` / `data-out`，以及 `data-seq`、`data-each` 容器里的每一项）各是一个小块，位置就是它真正在画面上的那一段，和播放时一致：外层还没出现或已经消失时，里面的也不算；淡出算到淡完；永远不会出现的不画；时间写错的标成出错，悬停看原因。点一下选中（场景和属性面板「元素出现时间」里的那一行一起亮），双击去改它的出现时间。最多排三行，同一时刻更多的元素会接在最早开始的那一行后面。文件被别处改动（AI 导演、代码页）后，选中的仍是原来那个元素，即使它换了位置。只由脚本驱动的元素不在这条轨上。元素不能在这里删除或拖动改时间：在元素上按 Delete 不会删掉场景。
- 引用到对话：选中场景、拍点、字幕或元素后，点工具条的「引用到对话」，或在时间线上右键，把它指给 AI 看。引用的是文件里的原文：文件名、场景标题行、时间，元素还带它的开始标签和第一段文字，字幕带它在文件里的那一行时间，所以 AI 知道你指的是哪一行，只改这一处。
- 和 AI 导演的对话在右栏，与属性并排成两个标签：就是 Forsion 自己的对话，一个工程文件夹一条会话，工作目录就是这个文件夹，重启后接着聊。让它生成的图片直接落在工程的 `generated/` 里，素材区随即列出来。「AI 导演」按钮改为打开这个对话；一键任务（配乐、看一遍成片提意见、卡点检查里的「让 AI 修正」，以及新建视频时写的想法）把请求填进输入框，等你发送，不替你发出。文字页每一行的「AI 改写」照旧当场改。
- 素材区多列一个文件夹 `generated/`，AI 生成的素材带标记；可以按类型、未使用、AI 生成筛选；右键可以放进时间线或在文件夹中显示。重命名和删除暂时灰着（Forsion 还没有给插件这两个接口）。
- 时间线不再占右栏：底部面板只横跨素材区和编辑器，右栏（属性和对话）从上到下是完整的一列（Space 配方 `layout.bottomSpan: "left"`）。配方版本不变，已保存的布局不会被替换。
- 导演技能（SKILL.md 0.4.0）重新整理：先讲在编辑器对话里怎么工作（工程文件夹、`generated/`、引用的格式、「指了哪里就只改哪里」），时间优先写在元素上（这样才会出现在元素轨上），一个东西一个元素，新增「改用户指的那一处」和「配图」两段流程。
- 修复：右键菜单开着时，别的面板一滚动它就关了。现在只有菜单所指的那个东西跟着滚动、或者它已经被重画掉时才关。
- 需要的 Forsion：元素轨、素材区的 `generated/`、筛选和右键菜单、时间线只占左边，在 2.12.2 上就有。右栏的对话和「引用到对话」需要支持 `ctx.tangu.mountChat` 的 Forsion（2.12.2 之后，尚未发布）；更早的版本上「AI 导演」照旧是原来的面板，一键任务照旧直接交给它，没有引用按钮和时间线右键菜单。直接放在笔记库根目录的工程没有自己的文件夹，也用原来的面板。
- **English:** Elements are on the timeline: a new Elements lane under the scenes shows every element that carries its own timing (`data-in` / `data-out`, and each child of a `data-seq` or `data-each` container) as a block over the time it is really on screen, as playback shows it: not while what contains it is off screen, to the end of a fade-out, no block for one that never appears, and one whose time cannot be read is marked as an error (hover for the reason). Click to select it (its scene and its row under Element timing in Properties light up), double-click to edit its in time. Up to three rows; when more elements overlap, the next one continues on the row that started earliest. After the file is changed elsewhere (the AI Director, the Code tab) the selection is still the same element, even if it moved. Elements driven only from scripts are not listed. Elements cannot be deleted or dragged here, and Delete on an element does not delete its scene. Quote in chat: with a scene, a hit, a caption or an element selected, use Quote in chat on the timeline toolbar, or right-click it on the timeline, to point the AI at it. The quote is the file's own words (file name, scene heading, time; for an element its opening tag and first text, for a caption its time line as written), so the AI knows which line you mean and changes only that. The conversation with the AI Director now lives in the right side as a tab next to Properties: it is Forsion's own chat, one session per project folder, working in that folder, and it is still there after a restart. Pictures you ask for land in the project's `generated/` folder and show up in the bin. The AI Director button opens that conversation; the one-click tasks (Score, Review the cut, Have the AI fix it under the sync check, and the idea written on the New video page) leave their request in the input for you to send, and nothing is sent for you. AI rewrite on a line of text still rewrites it on the spot. The bin also lists `generated/` and marks AI-generated files; filter by kind, unused or AI-generated; right-click to place a file on the timeline or show it in its folder. Rename and delete are disabled for now (Forsion has no plugin interface for them yet). The timeline no longer takes the right side: the bottom panel spans the bin and the editor only, and the right side (Properties and the conversation) runs the full height (`layout.bottomSpan: "left"` in the Space recipe; the recipe version is unchanged, so saved layouts are not replaced). The Director skill (SKILL.md 0.4.0) is reorganised: how to work in the editor's conversation (the project folder, `generated/`, what a quote looks like, change only what was pointed at), timing goes on the elements first (that is what puts them on the Elements lane), one thing per element, and two new workflows (a change to what the user pointed at; pictures). Fixed: an open right-click menu closed whenever another panel scrolled; it now closes only when the thing it belongs to scrolls or has been redrawn away. Forsion versions: the Elements lane, `generated/` in the bin, the filter, the file menu and the left-only timeline work on 2.12.2. The conversation in the right side and Quote in chat need a Forsion with `ctx.tangu.mountChat` (later than 2.12.2, not released yet); on earlier versions the AI Director is the previous panel, the one-click tasks go straight to it as before, and there is no quote button or timeline menu. A project that sits directly in the root of the library has no folder of its own and also keeps the previous panel.

## 0.8.3 — 2026-10-04

- 修复：撤销快捷键（⌘Z / Ctrl+Z，重做同理）在属性面板里改过东西、或从素材区加了文件之后不起作用，只有撤销按钮能用。属性面板和素材区在 Forsion 的侧栏里，不在编辑器里面，按键到不了编辑器；改完之后被重绘掉的按钮还会让焦点落到页面上。现在键盘跟着工程走：在编辑器、时间线、属性面板或素材区里点过之后，快捷键（撤销、重做、空格播放、方向键、删除等）都算这个工程的，直到你去点 Forsion 的别处。素材区只认撤销和重做（在素材上按 Delete 不会删掉场景）；文本框里正在输入时照旧用文本框自己的撤销。
- 修复：点预览画面里没有内容的地方，或双击不是文字的地方之后，键盘留在预览画面里、快捷键全部失效。
- 时间线刚打开时占窗口的一半：这是 Forsion 的问题（插件直接打开的底部面板没有落到默认高度，还把这个高度当成你拖出来的记住了），已在 Forsion 里修复，默认约为窗口的三分之一。更早的 Forsion（含 2.12.2）上仍是一半，拖一次分隔线就会记住你的高度。
- **English:** Fixed: the undo shortcut (⌘Z / Ctrl+Z, and redo) did nothing after a change made in the properties panel or a file added from the media bin; only the undo button worked. Those panels sit in Forsion's side areas, outside the editor, so keys never reached it, and a button that was redrawn away left the focus on the page. The keyboard now stays with the project: after a click in the editor, the timeline, the properties or the bin, shortcuts (undo, redo, Space to play, arrows, Delete and the rest) belong to the project until you click elsewhere in Forsion. The bin passes only undo and redo (Delete on a file there does not delete a scene); a text box you are typing in keeps its own undo. Fixed: a click on an empty part of the preview, or a double-click on something that is not text, left the keyboard in the preview and every shortcut dead. The timeline opening at half the window is a Forsion issue (a bottom panel opened by a plugin was not brought to its default height, and that height was remembered as yours); it is fixed in Forsion, where the default is about a third of the window. Earlier Forsion versions (2.12.2 included) still open it at half: drag the divider once and your height is kept.

## 0.8.2 — 2026-10-04

- Space 图标换成插件自己的图标,不再和别的插件共用图标库里的同一枚(`space.json` 的 `iconFile`)。需要支持 Space 自绘图标的 Forsion(2.12.2 之后的版本);更早的版本照旧显示原来的图标。配方版本不变,已保存的布局不受影响。
- **English:** The Space now shows the plugin's own icon instead of a shared library icon (`iconFile` in `space.json`). Needs a Forsion version that supports custom Space icons (later than 2.12.2); earlier versions keep the previous icon. The recipe version is unchanged, so saved layouts are not affected.

## 0.8.1 — 2026-10-03

- 导航一直找得回来：视频工作室 Space 的主区编辑器和左栏导航标成固定 View（Space 配方 `"pinned": true`）。打开工程后素材区不再把导航整栏换掉，而是作为左栏的第二个标签开在导航旁边并显示在前面，点导航的标签随时回到「新建视频 / 我的工程」；关闭工程时素材区的标签收走。固定的视图关不掉，也拖不出自己所在的面板。
- 需要支持固定 View 的 Forsion；更早的版本忽略 `pinned`，仍是 0.8.0 的行为（打开工程时左栏整栏换成素材区）。插件代码没有改动：同一句 `ctx.replaceView('nav', 'media')`，宿主遇到固定的视图就改为在旁边开标签。
- 各视图注册时带上标签图标（导航、素材区、编辑器、时间线）：左栏的标签只显示图标，导航和素材区分成两个标签后需要各有一个才分得清。更早的 Forsion 忽略这一项。
- Space 配方升到 1.3.0，已保存的布局会被替换。

## 0.8.0 — 2026-10-02

- 启动布局和项目布局（照 Coding Studio）：在视频工作室 Space 里，没打开工程时左栏是导航（新建视频、我的工程、第 2.12 话示例），主区是启动台，底部面板收起；打开工程后左栏换成这个工程的素材区，底部开出时间线；「更多 → 关闭工程」回到启动台。在工程之间切换不会动底部面板，⌘J 收起的仍保持收起。工程的选择还在工具栏标题的下拉里，原来那一栏工程列表的位置让给了素材。
- 启动台：「我的工程」列出全部工程，显示片名、路径、画幅和时长，可以搜索、刷新，也能打开示例。「新建视频」是一页：先写想法（可选），再选画幅（横屏 16:9、竖屏 9:16、方形 1:1、4:3）、起名字。名字带 `/ \ : * ? " < > |`、以点开头或结尾、或者和已有文件夹同名时，会直接提示，不写任何文件。
- 新建的工程放在自己的文件夹里：`<工作文件夹>/<名字>/<名字>.fvs.md`，导入的素材放在它旁边的 `media/`、`audio/`。写了想法的话，创建后想法会填进 AI 导演，由你确认后再发送，不会自动发出。命令面板「新建视频工程」和工程列表的「新建」也改为打开这一页。文件树右键新建和笔记里的 `/` 新建照旧建在你选的位置。
- 素材区：以缩略图网格列出工程文件夹里 `media/`、`audio/`、`assets/` 下的图片、视频和声音，工程里用到的标「已用」。「导入」或从电脑拖进素材区只是复制进工程，不放进时间线。拖到时间线上落在插入竖线所在的切点（声音从那个切点开始）；双击加到播放头所在场景之后（声音从播放头开始），Enter 键同样可用。
- 默认名字跟随界面语言：中文界面是「新视频」，英文界面是「New video」（之前一律是「新视频」）。
- 直接进视频工作室（比如启动停在主页、刚 reload）时，工程列表和上次的工程会等笔记库打开后再读，不再显示成空的（只在插件视图会唤醒笔记库的 Forsion 上等；更早的版本不等，没打开库就照旧先去笔记里打开）。还没有笔记库时，启动台照常立即出现；新建会提示先在笔记里打开一个库，而不是报「No vault is open」。
- 时间线通栏：底部面板横跨素材区、编辑器和属性三列，素材区和属性坐在时间线上方（Space 配方 `layout.bottomSpan: "full"`）。需要支持 `bottomSpan` 的 Forsion；更早的版本忽略这一项，时间线照旧只在编辑器和属性下方。
- 修复：重启后还原的布局、命令面板或工程列表打开的视频工作室，进工程后左栏不换素材区，时间线也留在编辑器里。原因是停靠要看 Space 配方给主视图带的一个参数，而存下来的布局会把它丢掉。现在只要所在窗口有底部面板就停靠，不再看这个参数，配方里也去掉了它。在别的 Space 里打开也停靠：那里左栏没有导航可换，就不出素材区；时间线没开着时，编辑器下方给一条「显示时间线」。
- Space 配方升到 1.2.0（左栏改为插件自己的导航视图，已保存的布局会被替换）。需要 Forsion 宿主支持 `ctx.replaceView` / `ctx.closeView`；更早的 Forsion 上左栏一直是导航、没有素材区，时间线仍在编辑器里，其余照常。

## 0.7.0 — 2026-10-02

- 时间线进原生底部面板：在视频工作室 Space 里，时间线不再画在编辑器视图底部，而是停在 Forsion 的底部面板（和终端同一个位置），可以拖高、⌘J 收起和展开。编辑器、属性面板和底部时间线共用同一份工程状态；在底部面板里按方向键、空格、S、Delete 等快捷键照常生效。面板收起时编辑器下方出现一行提示和「显示时间线」按钮。旧版 Forsion、移动端、浮窗和文件标签页没有可用的底部面板，时间线照旧画在编辑器里。
- 时间线缩放：按住 ⌘ / Ctrl / Alt 滚动滚轮，或在触控板上双指捏合，以指针处为锚点缩放；`=` 放大、`-` 缩小（以播放头为锚点，播放头不在视野里时以中间为锚点），⇧Z 缩放到整片可见。缩放滑块改为对数刻度，从半屏看全片一直放大到逐帧（至少 400 像素 / 秒）。工具条的「整体」改名「适应」。
- 时间刻度尺只绘制可见区域，放大到很长的影片也不再超出画布尺寸上限；没有速度标记的工程，刻度可以细到 0.1 秒。
- 修复：Forsion 打开或收起底部面板时会把编辑器所在的整列重新挂载，预览因此重新加载，画面一直黑着，直到再次播放或拖动播放头。现在预览重新加载后回到原来的时间和播放状态；笔记里嵌入的视频同样回到封面帧。
- Space 配方增加 `layout.bottom`，需要 Forsion 宿主支持 `ctx.viewLocations`（插件据此判断能不能用底部面板）。配方版本升到 1.1.0，已保存的布局会被替换成新布局。

## 0.6.0 — 2026-10-02

- 字幕轨：时间线最上面一条字幕轨（叠在画面上的轨道排在画面轨之上）。双击轨道或点工具条的字幕按钮在播放头处加一条，拖动移动、拖两端修剪、Delete 删除；属性面板新增「字幕」页，按时间列出全部字幕，可改起止时间和文字（Shift+Enter 换行），设置位置（底部 / 顶部）和大小。
- 字幕存在工程文件开头的一个 ```` ```srt ```` 块里（标准 SubRip，整片时间，和音轨一样不随场景改动移动）；只改这一个块，删光字幕时整块移除、文件逐字节还原。可导入 `.srt` / `.vtt`（工具条「导入素材」、拖进时间线或字幕页），「导出 → 导出字幕（SRT）」写出同名 `.srt`。
- 预览、网页导出和 MP4 都画出字幕；MP4 默认烧录，导出面板可取消「烧录字幕」。命令行新增 `fvs captions`、`render --no-captions`，`fvs info` 显示字幕摘要，`check` 报告时间写错和超出片尾的字幕。导演技能（SKILL.md 0.3.0）说明字幕块写法。
- 视频工作室 Space 里属性面板随工程默认打开，不抢键盘焦点；AI 导演、导出面板或工程选择器临时占用右侧后，关闭时属性面板自动回来；切走 Space 再回来也会恢复。用户自己关掉（属性按钮、面板的 ×、Esc）后本次会话不再自动打开。

## 0.5.0 — 2026-10-01

- 界面按 Genesis 设计语言重排：一条工具栏（片名、保存状态、撤销重做、AI 导演、导出、更多），下面依次是舞台、走带和时间线。去掉了重复的分镜列、预览标题条和常驻快捷键提示行；全片只保留「导出」一个实心主按钮。颜色、字号、圆角、阴影全部取自 Genesis token，暗色和各配色下的导出按钮文字不再看不见。
- 时间线：场景片段直接显示真实缩略图；每条音轨占一条轨道并画出波形，可以拖动改起点；卡点状态改用语义色，「卡点检查」弹层给出图例、偏离列表和「让 AI 修正」。
- 传统剪辑：导入图片、视频和音频（工具条按钮，或直接拖进时间线，落在插入竖线的位置）；视频由运行时接管，预览、网页导出和 MP4 渲染逐帧对齐并混入原声。在播放头处分割（S 或 ⌘B）；拖左边缘修剪入点、拖右边缘改长度，相邻场景让位，按住 Alt 则推移后面所有场景；拖动片段调整顺序；⌘D 复制、Delete 删除场景。
- 转场：交叉淡化、经背景色、从右滑入、从下滑入、向左推入、擦除、缩放、模糊。在属性面板选类型和时长，时间线片段开头显示转场区间。
- 新场景模板：标题卡、一句话、要点、数据、引言、对比、图文、终端、片尾、空白。用当前工程自己的样式实时预览，横屏竖屏都能用，文字全部能在「文字」页改。
- 属性面板：长度可选小节、拍或秒；入点、转场、素材（视频入点、音量、静音、替换）分组显示。工程页增加画幅预设（横屏、竖屏、方形、4:3、4K）、背景色选择，以及音轨的入点、时长和静音。
- 导出面板改用分段选项（尺寸、画质，区间可选全片、当前场景或自定义）和一行摘要，操作按钮固定在底部。AI 导演面板显示随请求发送的场景和时间、常用任务，以及任务前后的改动。
- 窄窗口：属性栏改成浮层，不挡走带；按钮收成图标。菜单和弹层挂在页面最上层，支持方向键、Esc 和焦点归还。
- 工程列表显示工程自己的片名，隐藏导出任务、导演快照之类的临时副本；主动作改为「新建工程」。
- 行为变化：拖右边缘改长度时，如果下一场景有入点，改动的是它的入点（内容原地不动），不再改写拍点；没有入点的场景照旧。插入、复制、分割场景时在标题前只留一个空行（以前是两个），已有工程的往返逐字节不变。
- 开发：新增 i18n 覆盖检查（中英键集一致、英文不含汉字）和加载 Genesis 真实 token 的截图台架 `test/shots.mjs`。

## 0.4.0 — 2026-09-30

- 场景列表使用真实隔离渲染的分镜缩略预览，按可见范围加载，悬停播放动画。
- MP4 导出增加原生 Extend 设置面板、尺寸/帧率/区间/画质/配乐选项，真实 CLI 进度、取消、失败重试与成品入口。
- 导演任务使用原生 Chat Box，传递模型和思考档位；保存任务前快照，查看场景改动并恢复。
- 渲染先写临时 MP4，成功后发布成品；取消/失败清理临时工作，不覆盖已有导出。

## 0.3.0 — 2026-09-30

- 新增独立「视频工作室」Space，工程列表复用原生 Workspace 的搜索、选中和操作按钮，主工作台保存工程实体参数。
- 属性与导演任务使用原生 Extend View，切换工程、关闭或禁用插件时随主视图清理；旧宿主保留内联面板。工程标题可打开临时工程选择器。
- 新增独立 Mini 视频预览适配和原生浮窗入口；Mini 保留播放和切换场景，可把同一工程带回完整主面板。
- 切换工程前等待写入完成；浮窗工程选择器重新选择当前工程可返回编辑器。
- 文件标签页可一键进入完整工作室；默认工程/示例目录名称固定，避免切换语言后生成两套目录。


## 0.2.0 — 2026-09-30

- 编辑工作台重新布局：可搜索的场景导航、按工程比例居中预览、分组属性面板。播放、场景切换、逐帧前进后退和静音集中在预览下方。
- 时间线使用场景标题、清晰的场景与配乐轨道；支持缩放滑杆、手动缩放保持、适配整体、上下调整高度；点击卡点概览直达详细检查。
- 新增专注预览和面板显隐；窄窗口自动收起场景列表，展开后选中场景自动收回；属性页签支持键盘导航，代码编辑增加明确的应用按钮。
- 工作台使用 Genesis 字体、圆角、色彩令牌和 SVG 图标，适配浅色、深色与窄窗口；新建工程与示例目录名称遵循宿主语言。
- 作为独立 Git 仓库维护，保留完整源码、导演 Agent、技能、命令行、配乐工具和完整示例工程；增加 dev 安装、回滚备份、界面回归与真 Electron 验证脚本。


## 0.1.0 — 2026-09-30

- 首个版本。`.fvs.md` 工程文件：场景是网页（HTML + CSS + 关键帧脚本），时间线踩在拍子上，画面切点和配乐重音读同一张拍点表。
- Video Studio 编辑器：隔离的实时预览、播放、时间线（拖右边缘改长度、拖拍点改切点、双击添加拍点、波形和音乐重音）、双击画面文字直接改、场景 / 文字 / 代码 / 工程面板、撤销重做、自动保存；AI 或别的编辑器改了文件会自动载入，并且可以撤销。
- 卡点检查：在编辑器里分析配乐的重音，标出没有落在重音上的拍点。
- AI：「问 AI」「配乐」「导出 MP4」交给内置的 Video Studio 导演 Agent；文字面板的「AI 改写」用一次性补全。
- 导出：单文件网页视频（素材和配乐内嵌）；MP4 由 Agent 用命令行工具在本机渲染。
- 命令行 `fvs`：new / info / check / cues / html / still / sheet / render / sync。
- 配乐工具包（Python）：VSCO 2 CE 采样乐队、决战 II 风格模块、按工程拍点表写配乐的模板和完整示例。
- 示例工程：Forsion 2.12 宣传片《第 2.12 话 · 人类补完计划》。
