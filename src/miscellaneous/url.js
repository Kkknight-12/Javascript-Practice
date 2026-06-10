// const x = new URL('utils/f', 'https://unpkg.com/medium-test-pkg/a/')
// console.log(x.pathname) // /medium-test-pkg/a/utils/f
// console.log(x.href) // https://unpkg.com/medium-test-pkg/a/utils/f

// //
// console.log()
// const a = new URL('/utils/f', 'https://unpkg.com/medium-test-pkg/a/')
// console.log(a.pathname) // /utils/f
// console.log(a.href) // https://unpkg.com/utils/f

// //
// console.log()
// const b = new URL('./utils/f', 'https://unpkg.com/medium-test-pkg/a/')
// console.log(b.pathname) // /medium-test-pkg/a/utils/f
// console.log(b.href) // https://unpkg.com/medium-test-pkg/a/utils/f

// //
// console.log()
// const c = new URL('../utils/f', 'https://unpkg.com/medium-test-pkg/a/')
// console.log(c.pathname) // /medium-test-pkg/utils/f
// console.log(c.href) // https://unpkg.com/medium-test-pkg/utils/f

// console.log()
// const d = new URL('../../utils/f', 'https://unpkg.com/medium-test-pkg/a/')
// console.log(d.pathname) // /medium-test-pkg/utils/f
// console.log(d.href) // https://unpkg.com/medium-test-pkg/utils/f

// new URL(url, base)
const A = new URL('articles', 'https://developer.mozilla.org/api/v1')
console.log(A.href) // https://developer.mozilla.org/api/articles

const B = new URL('articles', 'https://developer.mozilla.org/api/v1/')
console.log(B.href) // https://developer.mozilla.org/api/v1/articles


// absolute path "/"
const C = new URL('/articles', 'https://developer.mozilla.org/api/v1')
console.log(C.href) // https://developer.mozilla.org/articles

const CC = new URL('/articles', 'https://developer.mozilla.org/api/v1/')
console.log('CC => ', CC.href) // https://developer.mozilla.org/articles

// relative path "./"
const D = new URL('./articles', 'https://developer.mozilla.org/api/v1/')
console.log(D.href) // https://developer.mozilla.org/api/v1/articles

const E = new URL('./articles', 'https://developer.mozilla.org/api/v1')
console.log(E.href) // https://developer.mozilla.org/api/articles

const F = new URL('../articles', 'https://developer.mozilla.org/api/v1')
console.log(F.href) // https://developer.mozilla.org/articles

const G = new URL('../articles', 'https://developer.mozilla.org/api/v1/')
console.log(G.href) // https://developer.mozilla.org/api/articles
