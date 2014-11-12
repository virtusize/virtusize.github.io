.. highlight:: html

.. _label-upgrade-guide:

Upgrade Guide
-------------

If you are still using our old integration v2 and widget v4 you should 
upgrade to take advantage of the following benefits:

- Unified product page and order confirmation script. No need to include
  different scripts anymore.
- Simplified integration without global functions or strategies to define.
- Integration works on dynamic pages.
- New Virtusize Widget v5 with product images and purchase history.

**It's easy and straight forward!**

1. Replace product page integration with new one
================================================

On your product pages you should find the following old v2 integration before
the closing of the ``</body>`` tag::

  <script type="text/javascript">
    /*** Virtusize Widget parameters and initialization ***/
    window.vsWidgetAsyncInit = function(vsWidget) {

      vsWidget.setApiKey("0000000000000000000000000000000000000000");
      vsWidget.setProductId("PRODUCT_ID");

    };

    /*** Do not change anything below this line!    ***/
    /*** This will load the Virtusize widget script ***/
    (function(d, s){
      var fS = d.getElementsByTagName(s)[0], sE = d.createElement(s),
          p = "https:" == d.location.protocol ? "https://" : "http://cdn.";
      sE.async = true; sE.type = "text/javascript";
      sE.src = p + "api.virtusize.com/api/vs-widget/v2/vs-widget.js";
      fS.parentNode.insertBefore(sE, fS);
    }(document, "script"));
  </script>

Change this to the new integration::

    <!-- Virtusize Integration -->
    <script>
    !function(a,b,c,d){var e,f,g,h,i,j,k,l,m;for(a.Virtusize=d,a[d]=a[d]||[],a[d].env=null!=a.vsEnv?a.vsEnv:"production",a[d].url=null!=a.vsUrl?a.vsUrl:a.location.host,a.vsEnv=void 0,a.vsUrl=void 0,a[d].methods=["setApiKey","setRegion","setLanguage","setWidgetOverlayColor","addWidget","ready","on","setAvailableSizes","setSizeAliases","addOrder","setUserId"],a[d].factory=function(b){return function(){var c;return c=Array.prototype.slice.call(arguments),c.unshift(b),a[d].push(c),a[d]}},m=a[d].methods,k=0,l=m.length;l>k;k++)f=m[k],a[d][f]=a[d].factory(f);a[d].snippetVersion="3.1.0",i=b.createElement(c),e=b.getElementsByTagName(c)[0],i.async=1,g="/integration/v3.js",h=".virtusize.com"+g,j={production:"api"+h,staging:"staging"+h,local:a[d].url+g+"?source"},i.src="//"+("https:"!==a.location.protocol&&"local"!==a[d].env?"cdn.":"")+j[a[d].env],i.id="vs-integration",e.parentNode.insertBefore(i,e)}(window,document,"script","vs");
    
    vs.setApiKey("0000000000000000000000000000000000000000");
    vs.addWidget({
        productId: "PRODUCT_ID",
        buttonSelector: "BUTTON_SELECTOR",
        productImageUrl: "PRODUCT_IMAGE_URL"
    });
    </script>
    <!-- End Virtusize Integration -->

.. note::
    
    If you haven't been using your own button, you have to create one now and
    pass the CSS selector to it in the ``addWidget`` call above.
    
    If you don't want to create your own button, please talk to your Virtusize
    sales contact.

    The widget v5 displays product images. Please provide the URL to a publicly
    available image during integration.


2. Integrate on your order confirmation page
============================================

To experience the full feature set of Virtusize and enable purchase history for
your customers, it is necessary to take this additional step and integrate on
your order confirmation page.

Please refer to the :ref:`label-quick-start-guide` or the more detailed
:ref:`label-integration-v3` for more information on how to provide your order
data to Virtusize.

