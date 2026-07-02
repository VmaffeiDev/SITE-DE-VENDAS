#!/usr/bin/env python3
import subprocess
import sys
from pathlib import Path

repo_dir = Path(__file__).resolve().parent
patch_file = repo_dir / "melhorias.patch"

expected_markers = {
    ".env.example": "ADMIN_PASSWORD is required in production",
    "package.json": '"type-check"',
    "prisma/schema.prisma": "@@index([status])",
    "src/app/admin/consignados/actions.ts": "/^[a-z0-9_-]{10,40}$/i.test",
    "src/app/api/consignments/route.ts": "isValidImageMagicBytes",
    "src/app/consignar/page.tsx": "UPLOAD_FIELDS",
    "src/lib/upload-fields.ts": "export const UPLOAD_FIELDS",
    "src/middleware.ts": "WWW-Authenticate",
    "tsconfig.json": '"noImplicitReturns"',
}

if not patch_file.exists():
    print(f"Patch file not found: {patch_file}", file=sys.stderr)
    sys.exit(1)

check = subprocess.run(
    ["git", "apply", "--check", str(patch_file)],
    cwd=repo_dir,
    capture_output=True,
    text=True,
)

if check.returncode == 0:
    subprocess.run(["git", "apply", str(patch_file)], cwd=repo_dir, check=True)
    print("Patch applied successfully.")
    sys.exit(0)

output = (check.stderr or check.stdout).strip()
if "already applied" in output.lower() or "patch unexpectedly empty" in output.lower():
    print("Patch already applied or no-op.")
    sys.exit(0)

missing = []
for rel_path, marker in expected_markers.items():
    path = repo_dir / rel_path
    if not path.exists() or marker not in path.read_text(encoding="utf-8"):
        missing.append(rel_path)

if not missing:
    print("Patch already present in repository.")
    sys.exit(0)

print(output, file=sys.stderr)
print("Expected changes are not present; patch could not be applied.", file=sys.stderr)
sys.exit(check.returncode)
