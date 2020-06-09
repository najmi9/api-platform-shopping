<?php

namespace App\Events;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\KernelEvents;
use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use App\Entity\Like;
use Symfony\Component\Security\Core\Security;

class LikeUserSubscriber implements EventSubscriberInterface
{

    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setUserForLike', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setUserForLike(ViewEvent $event)
    {
        $like = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if ($like instanceof Like && $method === "POST") {
            $user = $this->security->getUser();
            if ($user) {
                $like->setUser($user);
            }
        }
    }
}
