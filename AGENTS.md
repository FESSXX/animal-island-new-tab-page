<!-- TRELLIS:START -->
# Trellis Instructions

These instructions are for AI assistants working in this project.

This project is managed by Trellis. The working knowledge you need lives under `.trellis/`:

- `.trellis/workflow.md` — development phases, when to create tasks, skill routing
- `.trellis/spec/` — package- and layer-scoped coding guidelines (read before writing code in a given layer)
- `.trellis/workspace/` — per-developer journals and session traces
- `.trellis/tasks/` — active and archived tasks (PRDs, research, jsonl context)

If a Trellis command is available on your platform (e.g. `/trellis:finish-work`, `/trellis:continue`), prefer it over manual steps. Not every platform exposes every command.

If you're using Codex or another agent-capable tool, additional project-scoped helpers may live in:
- `.agents/skills/` — reusable Trellis skills
- `.codex/agents/` — optional custom subagents

Managed by Trellis. Edits outside this block are preserved; edits inside may be overwritten by a future `trellis update`.

<!-- TRELLIS:END -->

## Git 提交约定

- Git 提交消息必须使用中文。
- 创建、修改或建议本仓库提交时，必须在提交信息末尾添加一次以下 trailer：

```text
Co-authored-by: Codex <noreply@openai.com>
```

- 保持用户的 GitHub 账号作为 primary author，除非用户明确要求改成其他身份。
- 不要修改 `git config user.name` 或 `git config user.email`。
- 每个提交只添加一次该 trailer。
- 提交正文和 trailer 之间保留一个空行。
- 如果创建或更新 pull request，确保最终提交信息包含该 trailer。

## 对话规则

- 默认使用 `caveman` 风格回复。
- 仅当用户明确要求 `stop caveman` 或 `normal mode` 时停止。
