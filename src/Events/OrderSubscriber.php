<?php

namespace App\Events;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\KernelEvents;
use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use App\Entity\Order;
use Symfony\Component\Security\Core\Security;

class OrderSubscriber implements EventSubscriberInterface
{

    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setUserForOrder', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setUserForOrder(ViewEvent $event)
    {
        $comment = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if ($comment instanceof Order && $method === "POST") {
            $user = $this->security->getUser();
            if ($user) {
                $comment->setUser($user)
                    ->setCreatedAt(new \DateTime())
                ;
            }
        }
    }
}
