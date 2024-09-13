import settings from '../frameworks/config/settings.js';

const messages = {
  general:{
    ok: 'Ok',
    badRequest : 'Bad request',
    invalidParams: 'Invalid parameters: {param}',
    missingFields: 'Missing fields:[ {fields} ]',
    insteadPatch: 'Use PUT instead of PATCH',
    notFound: 'Not found',
    found: 'Found',
  },
  products: {
    found: 'Product found',
    created: 'Product created successfully',
    updated: 'Product updated successfully',
    deleted: 'Product deleted successfully',
    notFound: 'Product not found',
    patched: 'Product patched successfully',
    categoryIdRequired: 'Category ID is required',
  },
  categories: {
    found: 'Category found',
    created: 'Category created successfully',
    updated: 'Category updated successfully',
    deleted: 'Category deleted successfully',
    notFound: 'Category not found',
    patched: 'Category patched successfully',
  }
}

function $t(key, meta = {}) {
  const template = key.split('.').reduce((o, i) => (o ? o[i] : undefined), messages);

  if (template && typeof template === 'string') {
    return template.replace(/{(\w+)}/g, (match, p1) => meta[p1] || `{${p1}}`);
  }

  return template;
}


 function getSource(url) {
  if(!url) return null;
  const parts = url.split('/');
  const apiIndex = parts.indexOf(settings.API_PREFIX);

  if (apiIndex !== -1 && parts.length > apiIndex + 1) {
    return parts[apiIndex + 2];
  }
  return null;
}


export function getMessage( data ) {

  const { message, url, args } = data;
  const source = getSource(url);

  const generalMessage = $t(`general.${message}`, args)
  const keyMessage = $t(`${source}.${message}`, args)
  const directMessage = $t(`${message}`, args)

  return (directMessage || keyMessage || generalMessage )?? message
}



export default getMessage;
