---
title: Links
category: details
order: 20
---

## Collection of links to various git-related documentation

- [Git HTTP transport protocol documentation](https://gist.github.com/schacon/6092633)
- [git reference](https://www.git-scm.com/docs)
- [git protocol capabilities](https://www.git-scm.com/docs/protocol-capabilities)
- [git HTTP protocol](https://www.git-scm.com/docs/http-protocol)
- [git PACK protocol](https://www.git-scm.com/docs/pack-protocol)
- [git pack format](https://www.git-scm.com/docs/pack-format)
- [Git Tip of the Week: Objects](https://alblue.bandlem.com/2011/08/git-tip-of-week-objects.html)
- [Git Internals - Transfer Protocols](https://git-scm.herokuapp.com/book/en/Git-Internals-Transfer-Protocols)
- [Git receive-pack.c Source](https://github.com/git/git/blob/master/builtin/receive-pack.c)
- [Reimplementing “git clone” in Haskell from the bottom up](https://stefan.saasen.me/articles/git-clone-in-haskell-from-the-bottom-up/)

```bash
set GIT_CURL_VERBOSE=1
$env:GIT_CURL_VERBOSE=1
$env:GIT_TRACE=1
git config --global http.proxy %HTTP_PROXY%
git config --global --unset http.proxy
git config --global http.sslVerify false
GIT_TRACE=2 GIT_CURL_VERBOSE=2 GIT_TRACE_PERFORMANCE=2 GIT_TRACE_PACK_ACCESS=2 GIT_TRACE_PACKET=2 GIT_TRACE_PACKFILE=2 GIT_TRACE_SETUP=2 GIT_TRACE_SHALLOW=2
```
