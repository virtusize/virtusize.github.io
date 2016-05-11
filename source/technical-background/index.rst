.. _label-technical-background:

Technical Background
====================

.. _label-dependencies:

Dependencies
------------

Currently, the integration has only one dependency, jQuery 1.3 or later. If jQuery
is not found on the page, the integration script will asynchronously load jQuery
from the Google CDN. This will not slow down the page as it is done asynchronously
and most client browsers already have it cached.


.. _label-integration-hosting-script:

Integration script hosting
--------------------------

The integration script is hosted on the global Amazon CloudFront CDN. The file
itself has a long-term cache set and is refreshed on new releases.


.. _label-asynchronous-loading:

Asynchronous loading
--------------------

All script loading is done asynchronously, minimising the impact on the load time
of the product page. The integration snippet is inspired by the asynchronous
loading done by Google Analytics and Facebook Connect. In the unlikely event of
Virtusize servers experiencing down time, the product page will not be impacted
other than the Virtusize button not showing.


.. _label-code-encapsulation:

Code encapsulation
------------------

The Virtusize widget opens as an iFrame on the product page, thus there is no CSS
or Javascript pollution of the product page, except the integration snippet and the
integration script.
