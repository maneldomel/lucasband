// Utility functions for handling URL parameters
export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  fbclid?: string;
  gclid?: string;
  msclkid?: string;
  ttclid?: string;
  twclid?: string;
  li_fat_id?: string;
  sc_click_id?: string;
  click_id?: string;
  cid?: string;
  affiliate_id?: string;
  sub_id?: string;
  external_id?: string;
  [key: string]: string | undefined;
}

export const getURLParams = (): UTMParams => {
  const urlParams = new URLSearchParams(window.location.search);
  const params: UTMParams = {};
  
  // Get all URL parameters, not just UTM ones
  for (const [key, value] of urlParams.entries()) {
    params[key] = value;
  }
  
  // Also check for hash parameters (some tracking systems use these)
  if (window.location.hash) {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    for (const [key, value] of hashParams.entries()) {
      if (!params[key]) { // Don't override query params with hash params
        params[key] = value;
      }
    }
  }
  
  return params;
};

export const buildURLWithParams = (baseUrl: string, params: UTMParams): string => {
  let url: URL;
  
  // Handle both relative and absolute URLs
  if (baseUrl.startsWith('http')) {
    url = new URL(baseUrl);
  } else {
    url = new URL(baseUrl, window.location.origin);
  }
  
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      url.searchParams.set(key, value);
    }
  });
  
  return url.toString();
};

export const getParamsString = (params: UTMParams): string => {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      searchParams.set(key, value);
    }
  });
  
  return searchParams.toString();
};

// Store parameters in sessionStorage for persistence across pages
export const storeParams = (params: UTMParams): void => {
  try {
    sessionStorage.setItem('urlParams', JSON.stringify(params));
  } catch (error) {
    console.warn('Failed to store parameters in sessionStorage:', error);
  }
};

// Retrieve stored parameters from sessionStorage
export const getStoredParams = (): UTMParams => {
  try {
    const stored = sessionStorage.getItem('urlParams');
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.warn('Failed to retrieve parameters from sessionStorage:', error);
    return {};
  }
};

// Merge current URL params with stored params (URL params take precedence)
export const getAllParams = (): UTMParams => {
  const urlParams = getURLParams();
  const storedParams = getStoredParams();
  
  // URL parameters override stored parameters
  return { ...storedParams, ...urlParams };
};