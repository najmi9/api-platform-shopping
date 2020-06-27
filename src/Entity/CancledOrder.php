<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\CancledOrderRepository;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(
 * attributes={
 *   "security"="is_granted('ROLE_USER')",
 *  "security_message"="une authenfication est requise pour création  d'une cart"
 *  },
 *   itemOperations={
 *       "GET"={},
 *       "DELETE" = {
 *        "security"="is_granted('ROLE_ADMIN')",
 *        "security_message"="juste l'admin peut supprimer cet order !"
 *       
 *       },
 *       "PUT" = {
 *          "security"="is_granted('ROLE_ADMIN')",
 *          "security_message"="juste l'admin peut modifer cet order !"
 *       }
 *   },
 *   collectionOperations={
 *      "POST" = {},
 *       "GET"= {}
 *       },
 * )
 * @ORM\Entity(repositoryClass=CancledOrderRepository::class)
 */
class CancledOrder
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotNull(message="le paymentID ne peut pas être null")
     */
    private $paymentID;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotNull(message="le paymentID ne peut pas être null")
     */
    private $paymentToken;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotNull(message="le paymentID ne peut pas être null")
     */
    private $intent;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotNull(message="le paymentID ne peut pas être null")
     */
    private $billingID;

    /**
     * @ORM\Column(type="datetime")
     */
    private $createdAt;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="orders")
     */
    private $user;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPaymentID(): ?string
    {
        return $this->paymentID;
    }

    public function setPaymentID(string $paymentID): self
    {
        $this->paymentID = $paymentID;

        return $this;
    }

    public function getPaymentToken(): ?string
    {
        return $this->paymentToken;
    }

    public function setPaymentToken(string $paymentToken): self
    {
        $this->paymentToken = $paymentToken;

        return $this;
    }

    public function getIntent(): ?string
    {
        return $this->intent;
    }

    public function setIntent(string $intent): self
    {
        $this->intent = $intent;

        return $this;
    }

    public function getBillingID(): ?string
    {
        return $this->billingID;
    }

    public function setBillingID(string $billingID): self
    {
        $this->billingID = $billingID;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }
}
