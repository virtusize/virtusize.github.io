.. role:: raw-html(raw)
   :format: html

.. _label-faq:

FAQ
===

**How do I verify the integration?**

    You can verify your integration by using our Bookmarklet. Just drag the following
    link to your bookmarks bar.

    :raw-html:`<a href="javascript:void((function(){var%20element=document.createElement('script');element.setAttribute('src','https://rawgit.com/virtusize/bookmarklets/master/build/override.min.js');element.setAttribute('id','vs-bookmarklet');document.body.appendChild(element)})())" title="Virtusize Bookmarklet" class="fa fa-bookmark">&nbsp;Virtusize Bookmarklet</a>`

    When you click this bookmarklet on either your product pages or your order
    confirmation page, a little toolbar should appear at the bottom of the page. It tells
    you at first glance if you have integrated correctly.

    The debug tab will give you more information about whether or not you have
    integrated correctly.

    In this example below, the using the Debug mode on a product page shows us:

    - The API key being used
    - There is one widget integrated on the page

    .. image:: https://dasbbwm9ji7ym.cloudfront.net/integration-guide/images/faq-bookmarklet-debug.png
       :alt: Virtusize Bookmarklet: Debug tab

    |
    In the widget section of the Bookmarklet, we can also see:

    - The Product ID being picked up by the Virtusize snippet
    - The button selector on the page
    - The image URL
    - Whether or not the Product ID is available in the Virtusize database: Valid = true

    .. image:: https://dasbbwm9ji7ym.cloudfront.net/integration-guide/images/faq-bookmarklet-widgets.png
       :alt: Virtusize Bookmarklet: Widgets tab

    |
    You can append ``#hasVsWidget`` to any product page URL, press enter to load and
    then press enter a second time to verify an integration. For example http://www.store.com/#hasVsWidget

    ``Is Valid Product: false`` tells you that we don't have a product in our database.
    Here is an example response for a valid integration:

    .. image:: https://dasbbwm9ji7ym.cloudfront.net/integration-guide/images/faq-bookmarklet-popup.png
       :alt: Virtusize Integration verification


.. _label-faq-product-page:

Product Page Integration
------------------------

**Why isn't Virtusize showing up on my product pages?**

    Make sure you have items uploaded to your Virtusize dashboard before testing. The
    Virtusize button will only be visible for products that are stored in our database.

    Make sure you've correctly identified the product ID from your product page that
    matches the product ID for the corresponding product in your Virtusize dashboard.
    If the IDs don't match, the button won't display. If you have multiple product
    identifiers on your product pages, make sure that you are using the correct value
    for the Virtusize script that matches the IDs in your Virtusize dashboard.

    Do you have different IDs for different color variants  / SKUs?  If your product
    pages contain more than one color variant, and each SKU has a unique identifier,
    make sure you are able to use the correct ID that is unique for that particular item.

    If you also have different product identifiers for each different size, there still
    needs to be a unique ID set for the whole size set.

    See :ref:`label-setting-the-product-id`.


**Why is Virtusize widget only displaying one product size?**

    Make sure you upload all the different sizes for a product under the same product
    ID. Do not upload each size with a unique product ID.


**Why is there no product image in the Virtusize widget?**

    You need to supply an image URL in the integration on your product pages. When sending
    back an image URL, make sure that you include ``http://`` or ``https://``

    See :ref:`label-setting-the-product-image-url`.


**Will the Virtusize button show up on mobile?**

    Yes, the Virtusize mobile widget is fully responsive and we have automatic device
    detection. If your mobile site runs on a different platform to your desktop site,
    you will need to integrate the Virtusize script separately on your mobile platform.

    See :ref:`label-mobile-integration`.


.. _label-faq-order-confirmation:

Order confirmation integration
------------------------------

**Do I need to send back all of the listed attributes to Virtusize from our order
confirmation page?**

    We recommend sending back all attributes. If you are unable to do so, check the
    list to see the minimum requirements.

    See :ref:`label-order`.


**Is it okay to send back a dummy user ID?**

    No, it has to be unique per user.


**I’m sending back all of the attributes, why are none of our purchases being
registered as Virtusize purchases?**

    A Virtusize purchase will only register once the user opened the Virtusize widget
    on a product page and made a comparison with a reference garment on the compare panel.

    Check with us to see if the purchase was registered afterwards. You can also
    check your Virtusize admin dashboard for real-time metrics.


**Why are Virtusize purchases not registered?**

    Check that the product ID on your order confirmation page matches the one supplied
    on the product page. Make sure the product ID being sent back to us doesn't have
    size or color appended to the ID.
