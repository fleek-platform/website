import { getAssetFromKV, mapRequestToAsset } from '@cloudflare/kv-asset-handler'

addEventListener('fetch', event => {
  event.respondWith(handleEvent(event))
})

async function handleEvent(event) {
  const request = event.request
  const url = new URL(request.url)

  try {
    if (url.pathname.startsWith('/agents/')) {
      try {
        return await getAssetFromKV(event)
      } catch (assetError) {
        return await getAssetFromKV(event, {
          mapRequestToAsset: req => {
            return mapRequestToAsset(new Request(`${new URL(req.url).origin}/agents/index.html`, req))
          }
        })
      }
    }

    if (url.pathname.startsWith('/dashboard/')) {
      try {
        return await getAssetFromKV(event)
      } catch (assetError) {
        return await getAssetFromKV(event, {
          mapRequestToAsset: req => {
            return mapRequestToAsset(new Request(`${new URL(req.url).origin}/dashboard/index.html`, req))
          }
        })
      }
    }

    return await getAssetFromKV(event)
  } catch (e) {
    return new Response('Not found', { status: 404 })
  }
}
