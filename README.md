# simple-tts-app

Simple TTS App

## GitHub Pages 배포

이 저장소는 GitHub Actions로 정적 HTML/CSS 사이트를 `gh-pages` 브랜치에 배포하도록 설정되어 있습니다.

배포를 사용하려면 GitHub 저장소의 **Settings > Pages**에서 다음처럼 설정합니다.

- Source: `Deploy from a branch`
- Branch: `gh-pages`
- Folder: `/ (root)`

### main 브랜치 배포

`main` 브랜치에 push되면 앱이 GitHub Pages 기본 경로에 배포됩니다.

```text
https://<OWNER>.github.io/<REPO>/
```

예를 들어 저장소가 `octocat/simple-tts-app`이면 main 배포 URL은 다음 형식입니다.

```text
https://octocat.github.io/simple-tts-app/
```

### 작업 브랜치 미리보기 배포

`main`이 아닌 작업 브랜치에 push되면 앱이 `previews/<branch-slug>/` 경로에 배포됩니다.

```text
https://<OWNER>.github.io/<REPO>/previews/<branch-slug>/
```

`<branch-slug>`는 브랜치명을 URL 경로로 안전하게 쓰기 위해 `/` 등 특수 문자를 `-`로 바꾼 값입니다.

예를 들어 브랜치가 `feature/tts-ui`이면 미리보기 URL은 다음 형식입니다.

```text
https://<OWNER>.github.io/<REPO>/previews/feature-tts-ui/
```

## 로컬 확인

정적 서버로 로컬에서 확인할 수 있습니다.

```bash
python3 -m http.server 4173
```

그 다음 브라우저에서 `http://127.0.0.1:4173/`를 엽니다.
