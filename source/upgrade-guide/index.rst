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
    !function(a,b,c,d,e,f,g){var h,i,j,k;for(a.Virtusize=e,a[e]=a[e]||[],a[e].methods=["setApiKey","setRegion","setLanguage","setWidgetOverlayColor","addWidget","ready","on","setAvailableSizes","setSizeAliases","addOrder","setUserId"],a[e].factory=function(b){return function(){var c;return c=Array.prototype.slice.call(arguments),c.unshift(b),a[e].push(c),a[e]}},k=a[e].methods,i=0,j=k.length;j>i;i++)h=k[i],a[e][h]=a[e].factory(h);a[e].snippetVersion="3.0.2",f=b.createElement(c),g=b.getElementsByTagName(c)[0],f.async=1,f.src=("https:"===a.location.protocol?"https://":"http://cdn.")+d,f.id="vs-integration",g.parentNode.insertBefore(f,g)}(window,document,"script","api.virtusize.com/integration/v3.js","vs");
    
    vs.setApiKey("0000000000000000000000000000000000000000");
    vs.addWidget("PRODUCT_ID", "BUTTON_SELECTOR");
    </script>
    <!-- End Virtusize Integration -->

.. note::
    
    If you haven't been using your own button, you have to create one now and
    pass the CSS selector to it in the ``addWidget`` call above.
    
    If you don't want to create your own button, please talk to your Virtusize
    sales contact.


2. Integrate on your order confirmation page
============================================

To experience the full feature set of Virtusize and enable purchase history for
your customers, it is necessary to take this additional step and integrate on
your order confirmation page.

Please refer to the :ref:`label-quick-start-guide` or the more detailed
:ref:`label-integration-v3` for more information on how to provide your order
data to Virtusize.

